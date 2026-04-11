#!/usr/bin/env node

/**
 * Linear Integration for Changelog Generator
 * Fetches issues from Linear and converts them to changelog entries
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Make request to Linear GraphQL API
 */
function linearRequest(token, query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });
    
    const options = {
      hostname: 'api.linear.app',
      port: 443,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (parsed.errors) {
            reject(new Error(`Linear API Error: ${parsed.errors[0].message}`));
          } else {
            resolve(parsed.data);
          }
        } catch (e) {
          reject(new Error(`Failed to parse Linear response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Linear API request timeout'));
    });

    req.write(data);
    req.end();
  });
}

/**
 * Get teams from Linear workspace
 */
async function getTeams(token) {
  const query = `
    query {
      teams {
        nodes {
          id
          name
          key
          description
        }
      }
    }
  `;
  
  const data = await linearRequest(token, query);
  return data.teams?.nodes || [];
}

/**
 * Get projects from Linear workspace
 */
async function getProjects(token) {
  const query = `
    query {
      projects {
        nodes {
          id
          name
          description
          state
        }
      }
    }
  `;
  
  const data = await linearRequest(token, query);
  return data.projects?.nodes || [];
}

/**
 * Get states (statuses) from a team
 */
async function getStates(token, teamId) {
  const query = `
    query($teamId: String!) {
      workflowStates(filter: { team: { id: { eq: $teamId } } }) {
        nodes {
          id
          name
          color
          type
        }
      }
    }
  `;
  
  const data = await linearRequest(token, query, { teamId });
  return data.workflowStates?.nodes || [];
}

/**
 * Query issues from Linear
 */
async function getIssues(token, filter = {}) {
  const { teamId, projectId, stateNames = [], limit = 100, after = null } = filter;
  
  // Build the filter
  let issueFilter = [];
  
  if (teamId) {
    issueFilter.push(`team: { id: { eq: "${teamId}" } }`);
  }
  
  if (projectId) {
    issueFilter.push(`project: { id: { eq: "${projectId}" } }`);
  }
  
  // Build query
  const query = `
    query($first: Int!, $after: String) {
      issues(
        first: $first,
        after: $after,
        ${teamId ? `filter: { team: { id: { eq: "${teamId}" } } }` : ''}
        orderBy: updatedAt
      ) {
        nodes {
          id
          identifier
          title
          description
          state {
            name
            type
          }
          project {
            name
          }
          team {
            name
            key
          }
          assignee {
            name
            email
          }
          labels {
            nodes {
              name
              color
            }
          }
          createdAt
          updatedAt
          completedAt
          url
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  
  const allIssues = [];
  let cursor = after;
  let hasMore = true;
  
  while (hasMore && allIssues.length < limit) {
    const data = await linearRequest(token, query, { 
      first: Math.min(100, limit - allIssues.length),
      after: cursor 
    });
    
    const issues = data.issues?.nodes || [];
    allIssues.push(...issues);
    
    hasMore = data.issues?.pageInfo?.hasNextPage && allIssues.length < limit;
    cursor = data.issues?.pageInfo?.endCursor;
  }
  
  // Filter by state names if specified
  if (stateNames.length > 0) {
    return allIssues.filter(issue => stateNames.includes(issue.state?.name));
  }
  
  return allIssues;
}

/**
 * Get comments for an issue
 */
async function getIssueComments(token, issueId) {
  const query = `
    query($issueId: String!) {
      comments(filter: { issue: { id: { eq: $issueId } } }) {
        nodes {
          id
          body
          user {
            name
          }
          createdAt
        }
      }
    }
  `;
  
  const data = await linearRequest(token, query, { issueId });
  return data.comments?.nodes || [];
}

/**
 * Convert Linear markdown to standard markdown
 * Linear uses a subset of GitHub-flavored markdown
 */
function convertLinearMarkdown(text) {
  if (!text) return '';
  
  // Linear already uses standard markdown, but we can normalize it
  return text
    // Normalize line endings
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Ensure code blocks have proper spacing
    .replace(/```(\w*)\n/g, '```$1\n')
    // Normalize headers
    .replace(/^#{1,6}(?!\s)/gm, match => match + ' ');
}

/**
 * Map Linear state to changelog category
 */
function mapStateToCategory(state) {
  const stateMap = {
    'triage': 'improvement',
    'backlog': 'improvement',
    'unstarted': 'improvement',
    'started': 'improvement',
    'completed': 'feature',
    'canceled': 'fix'
  };
  
  return stateMap[state?.type] || 'improvement';
}

/**
 * Map Linear labels to tags
 */
function mapLabelsToTags(labels) {
  const tagMap = {
    'bug': 'fix',
    'feature': 'feature',
    'enhancement': 'improvement',
    'improvement': 'improvement',
    'security': 'security',
    'performance': 'performance',
    'design': 'design',
    'docs': 'docs'
  };
  
  return labels?.nodes?.map(label => {
    const normalizedName = label.name.toLowerCase();
    return tagMap[normalizedName] || normalizedName;
  }) || [];
}

/**
 * Convert Linear issue to changelog entry
 */
function linearIssueToEntry(issue, options = {}) {
  const {
    includeComments = false,
    includeUrl = true,
    customCategoryMap = {}
  } = options;
  
  // Determine category
  const category = customCategoryMap[issue.state?.name] || 
                   mapStateToCategory(issue.state);
  
  // Map labels to tags
  const tags = mapLabelsToTags(issue.labels);
  
  // Format date (use completedAt or updatedAt or createdAt)
  const date = issue.completedAt || issue.updatedAt || issue.createdAt;
  const formattedDate = date ? date.split('T')[0] : new Date().toISOString().split('T')[0];
  
  // Generate slug from title
  const slug = issue.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
  
  // Build content
  let content = convertLinearMarkdown(issue.description || '');
  
  // Add reference to original issue
  if (includeUrl) {
    content += `\n\n---\n\n*Originally tracked in [${issue.identifier}](${issue.url})*`;
  }
  
  // Build frontmatter
  const frontmatter = [
    '---',
    `title: "${issue.title}"`,
    `category: ${category}`,
    `date: ${formattedDate}`,
    tags.length > 0 ? `tags: [${tags.map(t => `"${t}"`).join(', ')}]` : '',
    issue.assignee?.name ? `author: "${issue.assignee.name}"` : '',
    issue.team?.name ? `team: "${issue.team.name}"` : '',
    issue.project?.name ? `project: "${issue.project.name}"` : '',
    `source: "linear"`,
    `linear_issue_id: "${issue.id}"`,
    `linear_identifier: "${issue.identifier}"`,
    `linear_state: "${issue.state?.name || 'unknown'}"`,
    '---'
  ].filter(Boolean).join('\n');
  
  return {
    slug,
    title: issue.title,
    category,
    date: formattedDate,
    tags,
    author: issue.assignee?.name || null,
    team: issue.team?.name || null,
    project: issue.project?.name || null,
    content: `${frontmatter}\n\n${content}`,
    source: 'linear',
    linearId: issue.id,
    linearIdentifier: issue.identifier,
    linearUrl: issue.url,
    linearState: issue.state?.name
  };
}

/**
 * Fetch issues from Linear and convert to markdown files
 */
async function syncFromLinear(config) {
  const {
    linearToken,
    teamId = null,
    projectId = null,
    stateNames = [],
    outputDir,
    limit = 100,
    includeComments = false,
    includeUrl = true,
    customCategoryMap = {}
  } = config;
  
  if (!linearToken) {
    throw new Error('Linear API token is required');
  }
  
  console.log('📋 Fetching issues from Linear...');
  
  if (teamId) {
    console.log(`   Team: ${teamId}`);
  }
  if (projectId) {
    console.log(`   Project: ${projectId}`);
  }
  if (stateNames.length > 0) {
    console.log(`   States: ${stateNames.join(', ')}`);
  }
  
  // Query issues
  const issues = await getIssues(linearToken, {
    teamId,
    projectId,
    stateNames,
    limit
  });
  
  console.log(`   Found ${issues.length} issues in Linear`);
  
  const entries = [];
  const errors = [];
  
  // Process each issue
  for (const issue of issues) {
    try {
      const entry = linearIssueToEntry(issue, {
        includeComments,
        includeUrl,
        customCategoryMap
      });
      
      entries.push(entry);
      
      // Write markdown file
      const filename = `${entry.date}-${entry.slug}.md`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, entry.content);
      console.log(`   ✓ ${entry.title} (${entry.linearIdentifier})`);
    } catch (error) {
      console.error(`   ❌ Failed to process issue ${issue.identifier}: ${error.message}`);
      errors.push({ issueId: issue.id, identifier: issue.identifier, error: error.message });
    }
  }
  
  console.log(`✅ Synced ${entries.length} entries from Linear${errors.length > 0 ? ` (${errors.length} errors)` : ''}`);
  
  return { entries, errors };
}

/**
 * Get workspace info to help users configure
 */
async function getWorkspaceInfo(token) {
  const teams = await getTeams(token);
  
  const teamInfo = [];
  for (const team of teams) {
    const states = await getStates(token, team.id);
    teamInfo.push({
      ...team,
      states: states.map(s => ({ name: s.name, type: s.type, color: s.color }))
    });
  }
  
  const projects = await getProjects(token);
  
  return {
    teams: teamInfo,
    projects: projects.map(p => ({ id: p.id, name: p.name, state: p.state }))
  };
}

/**
 * CLI interface for testing
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Linear Integration for Changelog Generator

Usage:
  node linear.js --token <token> [--team <team-id>] [--output <dir>]

Options:
  --token, -t     Linear API token (required)
  --team          Team ID to filter issues
  --project       Project ID to filter issues
  --states        Comma-separated list of state names to include
  --output, -o    Output directory for markdown files (default: ./entries)
  --limit         Maximum number of issues to fetch (default: 100)
  --info          Show workspace info (teams, projects) and exit
  --help, -h      Show this help message

Examples:
  # Show workspace info
  node linear.js --token <token> --info

  # Sync all completed issues from a team
  node linear.js --token <token> --team TEAM-123 --states "Done,Completed" --output ./entries
    `);
    process.exit(0);
  }
  
  const tokenIndex = args.indexOf('--token') !== -1 ? args.indexOf('--token') : args.indexOf('-t');
  const token = tokenIndex !== -1 ? args[tokenIndex + 1] : process.env.LINEAR_API_TOKEN;
  
  if (!token) {
    console.error('❌ Linear API token is required. Use --token or set LINEAR_API_TOKEN env var.');
    process.exit(1);
  }
  
  // Show workspace info
  if (args.includes('--info')) {
    console.log('🔍 Fetching workspace info...\n');
    const info = await getWorkspaceInfo(token);
    
    console.log('Teams:');
    for (const team of info.teams) {
      console.log(`  • ${team.name} (${team.key})`);
      console.log(`    ID: ${team.id}`);
      console.log('    States:');
      for (const state of team.states) {
        console.log(`      - ${state.name} (${state.type})`);
      }
    }
    
    console.log('\nProjects:');
    for (const project of info.projects) {
      console.log(`  • ${project.name} (${project.state})`);
      console.log(`    ID: ${project.id}`);
    }
    
    process.exit(0);
  }
  
  // Parse arguments
  const teamId = args.includes('--team') ? args[args.indexOf('--team') + 1] : null;
  const projectId = args.includes('--project') ? args[args.indexOf('--project') + 1] : null;
  const statesArg = args.includes('--states') ? args[args.indexOf('--states') + 1] : '';
  const stateNames = statesArg ? statesArg.split(',').map(s => s.trim()) : [];
  const outputDir = args.includes('--output') || args.includes('-o') 
    ? args[(args.indexOf('--output') !== -1 ? args.indexOf('--output') : args.indexOf('-o')) + 1]
    : './entries';
  const limit = args.includes('--limit') ? parseInt(args[args.indexOf('--limit') + 1], 10) : 100;
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Sync
  try {
    const result = await syncFromLinear({
      linearToken: token,
      teamId,
      projectId,
      stateNames,
      outputDir,
      limit
    });
    
    console.log(`\n📁 Files written to: ${path.resolve(outputDir)}`);
    console.log(`📊 Summary: ${result.entries.length} entries synced, ${result.errors.length} errors`);
    
    if (result.errors.length > 0) {
      console.log('\n⚠️ Errors:');
      for (const err of result.errors) {
        console.log(`  - ${err.identifier}: ${err.error}`);
      }
    }
  } catch (error) {
    console.error(`\n❌ Sync failed: ${error.message}`);
    process.exit(1);
  }
}

// Run CLI if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  syncFromLinear,
  getWorkspaceInfo,
  getTeams,
  getProjects,
  getIssues,
  linearIssueToEntry,
  convertLinearMarkdown
};

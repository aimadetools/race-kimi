#!/usr/bin/env node

/**
 * Webhook Notifications for Changelog Generator
 * Sends notifications to Slack and Discord when new entries are published
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Load webhook state to track which entries have been notified
 */
function loadWebhookState(stateFile) {
  if (fs.existsSync(stateFile)) {
    try {
      return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    } catch (e) {
      console.error('   ⚠️ Failed to parse webhook state file, starting fresh');
    }
  }
  return { notifiedEntries: [] };
}

/**
 * Save webhook state
 */
function saveWebhookState(state, stateFile) {
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  } catch (e) {
    console.error('   ⚠️ Failed to save webhook state:', e.message);
  }
}

/**
 * Send notification to Slack webhook
 */
async function sendSlackNotification(webhookUrl, entry, siteConfig) {
  const { siteName, siteUrl } = siteConfig;
  
  // Determine emoji based on category
  const categoryEmoji = getCategoryEmoji(entry.category);
  
  // Build Slack message using Block Kit format
  const payload = {
    text: `New changelog entry: ${entry.title}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${categoryEmoji} ${entry.category}: ${entry.title}`,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Site:*\n${siteName}`
          },
          {
            type: 'mrkdwn',
            text: `*Date:*\n${entry.date}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: truncateText(entry.rawContent, 500)
        }
      }
    ]
  };
  
  // Add tags if present
  if (entry.tags && entry.tags.length > 0) {
    payload.blocks.push({
      type: 'context',
      elements: entry.tags.map(tag => ({
        type: 'plain_text',
        text: `#${tag}`,
        emoji: false
      }))
    });
  }
  
  // Add button link
  const entryUrl = siteUrl ? `${siteUrl}/${entry.slug}.html` : `${entry.slug}.html`;
  payload.blocks.push({
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'View Entry →',
          emoji: false
        },
        url: entryUrl,
        style: 'primary'
      }
    ]
  });
  
  return sendWebhookRequest(webhookUrl, payload);
}

/**
 * Send notification to Discord webhook
 */
async function sendDiscordNotification(webhookUrl, entry, siteConfig) {
  const { siteName, siteUrl } = siteConfig;
  
  // Determine color based on category
  const color = getCategoryColor(entry.category);
  const categoryEmoji = getCategoryEmoji(entry.category);
  
  // Build Discord embed
  const embed = {
    title: `${entry.title}`,
    description: truncateText(entry.rawContent, 600),
    color: color,
    timestamp: entry.date ? new Date(entry.date).toISOString() : new Date().toISOString(),
    footer: {
      text: siteName
    },
    fields: []
  };
  
  // Add category field
  embed.fields.push({
    name: 'Category',
    value: `${categoryEmoji} ${entry.category}`,
    inline: true
  });
  
  // Add author if present
  if (entry.author) {
    embed.fields.push({
      name: 'Author',
      value: entry.author,
      inline: true
    });
  }
  
  // Add tags if present
  if (entry.tags && entry.tags.length > 0) {
    embed.fields.push({
      name: 'Tags',
      value: entry.tags.map(t => `#${t}`).join(', '),
      inline: false
    });
  }
  
  const payload = {
    username: `${siteName} Changelog`,
    avatar_url: 'https://changelog.page/favicon.svg',
    embeds: [embed]
  };
  
  // Add content with link if siteUrl is available
  if (siteUrl) {
    payload.content = `New changelog entry: ${siteUrl}/${entry.slug}.html`;
  }
  
  return sendWebhookRequest(webhookUrl, payload);
}

/**
 * Send HTTP POST request to webhook URL
 */
function sendWebhookRequest(webhookUrl, payload) {
  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    const data = JSON.stringify(payload);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'User-Agent': 'Changelog.page Generator'
      },
      timeout: 10000
    };
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, statusCode: res.statusCode });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.write(data);
    req.end();
  });
}

/**
 * Get emoji for category
 */
function getCategoryEmoji(category) {
  const emojiMap = {
    'Feature': '✨',
    'Features': '✨',
    'Improvement': '⚡',
    'Improvements': '⚡',
    'Fix': '🐛',
    'Fixes': '🐛',
    'Bug': '🐛',
    'Bugs': '🐛',
    'Security': '🔒',
    'Performance': '⚡',
    'Announcement': '📢',
    'Release': '🚀',
    'Major Release': '🚀',
    'Feature Release': '🎉',
    'Patch Release': '🔧',
    'Prerelease': '⚠️',
    'Documentation': '📚',
    'Docs': '📚',
    'Chore': '🔧',
    'Breaking': '💥',
    'Breaking Change': '💥',
    'Breaking Changes': '💥',
    'Deprecated': '⚠️',
    'Removed': '🗑️'
  };
  
  return emojiMap[category] || '📝';
}

/**
 * Get color code for Discord embed based on category
 */
function getCategoryColor(category) {
  const colorMap = {
    'Feature': 0x6366f1,      // Indigo
    'Features': 0x6366f1,
    'Improvement': 0x10b981,  // Emerald
    'Improvements': 0x10b981,
    'Fix': 0xf59e0b,          // Amber
    'Fixes': 0xf59e0b,
    'Bug': 0xf59e0b,
    'Bugs': 0xf59e0b,
    'Security': 0xef4444,     // Red
    'Performance': 0x06b6d4,  // Cyan
    'Announcement': 0x8b5cf6, // Violet
    'Release': 0x22c55e,      // Green
    'Major Release': 0x22c55e,
    'Feature Release': 0x3b82f6,
    'Patch Release': 0x6b7280,
    'Prerelease': 0xf97316,   // Orange
    'Documentation': 0x14b8a6,
    'Docs': 0x14b8a6,
    'Breaking': 0xdc2626,
    'Breaking Change': 0xdc2626,
    'Breaking Changes': 0xdc2626,
    'Deprecated': 0xca8a04,
    'Removed': 0x7f1d1d
  };
  
  return colorMap[category] || 0x64748b; // Default slate gray
}

/**
 * Truncate text to specified length
 */
function truncateText(text, maxLength) {
  if (!text) return '';
  text = text.replace(/[#*_\[\]()]/g, '').trim(); // Remove markdown
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Main function to notify webhooks about new entries
 */
async function notifyWebhooks(entries, config) {
  const {
    slackWebhookUrl,
    discordWebhookUrl,
    siteName,
    siteUrl,
    outputDir
  } = config;
  
  // Skip if no webhooks configured
  if (!slackWebhookUrl && !discordWebhookUrl) {
    return { notified: 0, errors: [] };
  }
  
  // Load state to track notified entries
  const stateFile = path.join(outputDir, '.webhook-state.json');
  const state = loadWebhookState(stateFile);
  
  const notifiedSlugs = new Set(state.notifiedEntries);
  const errors = [];
  let notifiedCount = 0;
  
  // Filter to new entries only
  const newEntries = entries.filter(e => !notifiedSlugs.has(e.slug));
  
  if (newEntries.length === 0) {
    return { notified: 0, errors: [] };
  }
  
  console.log(`📣 Sending webhook notifications for ${newEntries.length} new entr${newEntries.length === 1 ? 'y' : 'ies'}...`);
  
  // Send notifications for each new entry
  for (const entry of newEntries) {
    const siteConfig = { siteName, siteUrl };
    
    // Send Slack notification
    if (slackWebhookUrl) {
      try {
        await sendSlackNotification(slackWebhookUrl, entry, siteConfig);
        console.log(`   ✓ Slack: ${entry.title}`);
      } catch (error) {
        console.error(`   ❌ Slack failed: ${error.message}`);
        errors.push({ service: 'Slack', entry: entry.slug, error: error.message });
      }
    }
    
    // Send Discord notification
    if (discordWebhookUrl) {
      try {
        await sendDiscordNotification(discordWebhookUrl, entry, siteConfig);
        console.log(`   ✓ Discord: ${entry.title}`);
      } catch (error) {
        console.error(`   ❌ Discord failed: ${error.message}`);
        errors.push({ service: 'Discord', entry: entry.slug, error: error.message });
      }
    }
    
    // Mark as notified
    state.notifiedEntries.push(entry.slug);
    notifiedCount++;
  }
  
  // Save updated state
  saveWebhookState(state, stateFile);
  
  // Clean up old entries from state (keep last 100)
  if (state.notifiedEntries.length > 100) {
    state.notifiedEntries = state.notifiedEntries.slice(-100);
    saveWebhookState(state, stateFile);
  }
  
  return { notified: notifiedCount, errors };
}

module.exports = {
  notifyWebhooks,
  sendSlackNotification,
  sendDiscordNotification
};

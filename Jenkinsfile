// SchemaLens Schema Diff for Jenkins
// Place this file as Jenkinsfile in your repository root.
// Works with multibranch pipelines and PR-aware Jenkins setups.

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        SCHEMA_PATH        = 'db/schema.sql'
        DIALECT            = 'postgres'
        FAIL_ON_BREAKING   = 'false'
        SKIP_NO_SQL_CHANGE = 'false'
        POST_BUILD_COMMENT = 'false'
        FORMAT             = 'markdown'
    }

    stages {
        stage('Schema Diff') {
            steps {
                script {
                    // Smart skip: check if any .sql files were modified
                    if (env.SKIP_NO_SQL_CHANGE == 'true') {
                        def target = env.CHANGE_TARGET ?: 'main'
                        def changed = sh(
                            script: 'git diff --name-only origin/' + target + '..HEAD 2>/dev/null || true',
                            returnStdout: true
                        ).trim()
                        if (!changed.contains('.sql')) {
                            echo '[SchemaLens] No .sql files changed — skipping.'
                            currentBuild.description = 'Skipped — no SQL changes'
                            return
                        }
                    }

                    // Ensure tools are available
                    sh 'which jq >/dev/null 2>&1 || (apt-get update -qq && apt-get install -y -qq jq curl) || (apk add --no-cache jq curl) || true'

                    // Fetch base schema
                    def target = env.CHANGE_TARGET ?: 'main'
                    sh '''
                        git fetch origin "''' + target + '''" 2>/dev/null || true
                        git show "origin/''' + target + ''':$SCHEMA_PATH" > /tmp/schema_base.sql 2>/dev/null || echo "-- No base schema" > /tmp/schema_base.sql
                    '''

                    // Call SchemaLens API with retries
                    sh '''
                        set -euo pipefail

                        ENDPOINT="https://schemalens.tech/api/free-diff"
                        LICENSE_HEADER=""
                        if [ -n "${SL_LICENSE_KEY:-}" ]; then
                            ENDPOINT="https://schemalens.tech/api/diff"
                            LICENSE_HEADER="-H \"X-License-Key: $SL_LICENSE_KEY\""
                            echo "[SchemaLens] Using Pro endpoint."
                        fi

                        BODY=$(jq -n \
                            --arg schemaA "$(cat /tmp/schema_base.sql)" \
                            --arg schemaB "$(cat "$SCHEMA_PATH")" \
                            --arg dialect "$DIALECT" \
                            --arg format "$FORMAT" \
                            '{schemaA: $schemaA, schemaB: $schemaB, dialect: $dialect, format: $format}')

                        HTTP_STATUS=0
                        for attempt in 1 2 3; do
                            HTTP_STATUS=$(curl -sL -o /tmp/schemalens_response.json -w "%{http_code}" -X POST "$ENDPOINT" \
                                -H "Content-Type: application/json" \
                                ${LICENSE_HEADER} \
                                -d "$BODY" || echo "000")
                            if [ "$HTTP_STATUS" = "200" ]; then break; fi
                            echo "[SchemaLens] Attempt $attempt failed (HTTP $HTTP_STATUS). Retrying..."
                            sleep $((attempt * 2))
                        done

                        if [ "$HTTP_STATUS" != "200" ]; then
                            echo "[SchemaLens] API failed after 3 attempts (status: $HTTP_STATUS)"
                            cat /tmp/schemalens_response.json 2>/dev/null || true
                            exit 1
                        fi

                        jq -r \'.markdown // .migrationTeaser // "No output."\' /tmp/schemalens_response.json > schema_diff_report.md
                    '''

                    // Print report to console
                    sh 'cat schema_diff_report.md'

                    // Extract metrics for build description
                    def bcount = sh(script: 'jq -r \'(.summary.breakingChangeCount // (.breakingChanges | length) // 0)\' /tmp/schemalens_response.json', returnStdout: true).trim()
                    def score  = sh(script: 'jq -r \'.riskScore.score // 0\' /tmp/schemalens_response.json', returnStdout: true).trim()
                    def label  = sh(script: 'jq -r \'.riskScore.label // "Unknown"\' /tmp/schemalens_response.json', returnStdout: true).trim()
                    def ta     = sh(script: 'jq -r \'.summary.tablesAdded // 0\' /tmp/schemalens_response.json', returnStdout: true).trim()
                    def tr     = sh(script: 'jq -r \'.summary.tablesRemoved // 0\' /tmp/schemalens_response.json', returnStdout: true).trim()
                    def tm     = sh(script: 'jq -r \'.summary.tablesModified // 0\' /tmp/schemalens_response.json', returnStdout: true).trim()

                    currentBuild.description = "Risk: ${label} (${score}/100) | +${ta} -${tr} ~${tm} | ${bcount} breaking"

                    // Post SCM comment if enabled
                    if (env.POST_BUILD_COMMENT == 'true') {
                        postScmComment()
                    }

                    // Fail on breaking changes
                    if (env.FAIL_ON_BREAKING == 'true' && bcount != '0') {
                        error("[SchemaLens] ${bcount} breaking change(s) detected.")
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'schema_diff_report.md', allowEmptyArchive: true
        }
    }
}

// Post comment to GitHub PR or GitLab MR when tokens are available
def postScmComment() {
    def report = readFile('schema_diff_report.md').trim()
    def body   = "## SchemaLens Schema Diff Report\\n\\n" + report.replace('"', '\\"').replace('\n', '\\n')
    def json   = '{"body": "' + body + '"}'

    if (env.GITHUB_TOKEN && env.CHANGE_ID) {
        def repo = env.GIT_URL.replaceFirst(/^.*github\.com[/:]([^/]+\/[^/]+)\.git$/, '$1')
        sh '''
            curl -sL -X POST \
                -H "Authorization: token ''' + env.GITHUB_TOKEN + '''" \
                -H "Accept: application/vnd.github.v3+json" \
                "https://api.github.com/repos/''' + repo + '''/issues/''' + env.CHANGE_ID + '''/comments" \
                -d \'''' + json + '''\' || echo "[SchemaLens] Warning: failed to post GitHub comment."
        '''
    }

    if (env.GITLAB_TOKEN && env.CHANGE_ID) {
        sh '''
            curl -sL -X POST \
                -H "PRIVATE-TOKEN: ''' + env.GITLAB_TOKEN + '''" \
                -H "Content-Type: application/json" \
                "''' + env.CI_API_V4_URL + '''/projects/''' + env.CI_PROJECT_ID + '''/merge_requests/''' + env.CHANGE_ID + '''/notes" \
                -d \'''' + json + '''\' || echo "[SchemaLens] Warning: failed to post GitLab comment."
        '''
    }
}

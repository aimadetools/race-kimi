# SchemaLens CI/CD Examples

Ready-to-copy configuration files that add SchemaLens schema diff checks to popular CI/CD platforms.

Each example includes:

- A working pipeline configuration
- The same sample schemas (`schema/base.sql` and `schema/current.sql`)
- Instructions for adapting it to your project

## Examples

| Platform | File | Docs |
|----------|------|------|
| GitHub Actions | [`github-actions/schema-diff.yml`](github-actions/schema-diff.yml) | [github-action.html](https://schemalens.tech/github-action.html) |
| GitLab CI | [`gitlab-ci/.gitlab-ci.yml`](gitlab-ci/.gitlab-ci.yml) | [gitlab-schema-diff.html](https://schemalens.tech/gitlab-schema-diff.html) |
| Bitbucket Pipelines | [`bitbucket-pipelines/bitbucket-pipelines.yml`](bitbucket-pipelines/bitbucket-pipelines.yml) | [bitbucket-schema-diff.html](https://schemalens.tech/bitbucket-schema-diff.html) |
| Jenkins | [`jenkins/Jenkinsfile`](jenkins/Jenkinsfile) | [jenkins-schema-diff.html](https://schemalens.tech/jenkins-schema-diff.html) |
| CircleCI | [`circleci/config.yml`](circleci/config.yml) | [circleci-schema-diff.html](https://schemalens.tech/circleci-schema-diff.html) |
| Azure DevOps | [`azure-devops/azure-pipelines.yml`](azure-devops/azure-pipelines.yml) | [azure-devops-schema-diff.html](https://schemalens.tech/azure-devops-schema-diff.html) |

## Sample Schemas

- [`schema/base.sql`](schema/base.sql) — initial schema with `users` and `posts` tables
- [`schema/current.sql`](schema/current.sql) — updated schema with new columns, an index, and a `comments` table

Try the diff live at [schemalens.tech/app.html](https://schemalens.tech/app.html).

## Quick Start

1. Pick your platform above.
2. Copy the config file into your repository.
3. Replace `schema/base.sql` and `schema/current.sql` with your real schema files (or wire the "old" schema to your base branch).
4. Open a pull request that changes a `.sql` file and watch the diff report appear.

All examples use the free SchemaLens API endpoint by default. Add an `SL_LICENSE_KEY` or `license-key` variable to use Pro features.

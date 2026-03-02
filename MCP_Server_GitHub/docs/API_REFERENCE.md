# GitHub API reference for this MCP server

This document describes how this MCP server maps to the **GitHub REST API** and what is intentionally left as a core subset.

## Official API reference

- **[GitHub REST API](https://docs.github.com/en/rest)** — Full endpoint reference (hundreds of endpoints). This server exposes a **core subset**; for everything else, use the official docs or extend the server.

## Scope: core subset

This server intentionally covers a **core subset** of the GitHub REST API (repos, issues, pull requests, search, commits, contents, users, meta, rate limit). It does **not** expose every official endpoint. For full coverage, see [docs.github.com/en/rest](https://docs.github.com/en/rest).

## Endpoint vs MCP tool coverage

### Covered (MCP tools)

| Official endpoint / resource | MCP tool |
|------------------------------|----------|
| Meta API | `github_meta` |
| Rate limit | `github_rate_limit` |
| Authenticated user, get user | `github_user`, `github_user_get` |
| List / get / create / update / delete repos | `github_repos_list`, `github_repos_get`, `github_repos_create`, `github_repos_update`, `github_repos_delete` |
| List branches | `github_branches_list` |
| List / get / create / update issues | `github_issues_list`, `github_issues_get`, `github_issues_create`, `github_issues_update` |
| List / create issue comments | `github_issues_comments_list`, `github_issues_comments_create` |
| List / get / create / update pulls | `github_pulls_list`, `github_pulls_get`, `github_pulls_create`, `github_pulls_update` |
| List / create pull reviews | `github_pulls_reviews_list`, `github_pulls_reviews_create` |
| Search repos / issues / code | `github_search_repos`, `github_search_issues`, `github_search_code` |
| List / get commits | `github_commits_list`, `github_commits_get` |
| Get / create / update / delete file contents | `github_contents_get`, `github_contents_create`, `github_contents_update`, `github_contents_delete` |

### Not covered (optional / planned)

| Official endpoint / resource | Not covered |
|------------------------------|------------|
| Releases (create/update/delete release, list assets) | Add tools if needed |
| Reactions (add/delete on issues, comments, PRs) | Add tools if needed |
| Branches: get, create, delete, protection | Add tools if needed |
| Collaborators (add/remove/invite) | Add tools if needed |
| Git data (refs, tags, create commit/tree) | Add tools if needed |
| Gists (list/create/update/delete) | Add tools if needed |
| Organizations (members, etc.) | Add tools if needed |
| Teams (list/create/update/delete, memberships) | Add tools if needed |
| Checks / Actions (workflows, jobs, artifacts) | Add tools if needed |
| Deployments / Deploy keys | Add tools if needed |
| Update issue comment; lock/unlock issue | Add tools if needed |
| Merge PR; update review comment | Add tools if needed |
| Search users, search commits | Add tools if needed |

To add tools for any of the above, create a new module under `tools/github-api/`, export `apiTool`, register the path in `tools/paths.js`, and add a label in `lib/toolGroups.js`. Verify against [GitHub REST API](https://docs.github.com/en/rest).

## Quick checklist when updating tools

- [ ] Confirm the endpoint path and HTTP method in [GitHub REST API](https://docs.github.com/en/rest).
- [ ] Add or update the tool in `tools/github-api/` and register it in `tools/paths.js`.
- [ ] Add a label and short description in `lib/toolGroups.js`.
- [ ] Update this API_REFERENCE.md table.

/**
 * Tool groups and labels for the GitHub MCP server.
 */
export const TOOL_GROUP_ORDER = ['meta', 'users', 'repos', 'issues', 'pulls', 'search', 'commits', 'contents', 'other'];

export const TOOL_GROUP_LABELS = {
  meta: { title: 'Meta', description: 'API meta and rate limit.' },
  users: { title: 'Users', description: 'Authenticated user and user lookup.' },
  repos: { title: 'Repositories', description: 'List, get, create, update, delete repos; list branches.' },
  issues: { title: 'Issues', description: 'List, get, create, update issues; list and create comments.' },
  pulls: { title: 'Pull requests', description: 'List, get, create, update pulls; list and create reviews.' },
  search: { title: 'Search', description: 'Search repos, issues, code.' },
  commits: { title: 'Commits', description: 'List and get commits.' },
  contents: { title: 'Contents', description: 'Get, create, update, delete file contents.' },
  other: { title: 'Other', description: 'Other tools.' },
};

const L = (group, title, short) => ({ group, title, shortDescription: short });
export const TOOL_LABELS = {
  github_meta: L('meta', 'Meta', 'API meta info'),
  github_rate_limit: L('meta', 'Rate limit', 'Rate limit status'),
  github_user: L('users', 'Get user', 'Authenticated user'),
  github_user_get: L('users', 'Get user by username', 'User by username'),
  github_repos_list: L('repos', 'List repos', 'Repos for auth user'),
  github_repos_get: L('repos', 'Get repo', 'Repo by owner/name'),
  github_repos_create: L('repos', 'Create repo', 'Create repository'),
  github_repos_update: L('repos', 'Update repo', 'Update repository'),
  github_repos_delete: L('repos', 'Delete repo', 'Delete repository'),
  github_branches_list: L('repos', 'List branches', 'Branches for repo'),
  github_issues_list: L('issues', 'List issues', 'Issues for repo'),
  github_issues_get: L('issues', 'Get issue', 'Issue by number'),
  github_issues_create: L('issues', 'Create issue', 'Create issue'),
  github_issues_update: L('issues', 'Update issue', 'Update issue'),
  github_issues_comments_list: L('issues', 'List issue comments', 'Comments on issue'),
  github_issues_comments_create: L('issues', 'Create issue comment', 'Add comment'),
  github_pulls_list: L('pulls', 'List pulls', 'Pull requests'),
  github_pulls_get: L('pulls', 'Get pull', 'Pull by number'),
  github_pulls_create: L('pulls', 'Create pull', 'Create PR'),
  github_pulls_update: L('pulls', 'Update pull', 'Update PR'),
  github_pulls_reviews_list: L('pulls', 'List pull reviews', 'Reviews for PR'),
  github_pulls_reviews_create: L('pulls', 'Create pull review', 'Submit review'),
  github_search_repos: L('search', 'Search repos', 'Search repositories'),
  github_search_issues: L('search', 'Search issues', 'Search issues/PRs'),
  github_search_code: L('search', 'Search code', 'Search code'),
  github_commits_list: L('commits', 'List commits', 'Commits for repo'),
  github_commits_get: L('commits', 'Get commit', 'Commit by ref'),
  github_contents_get: L('contents', 'Get contents', 'Get file/dir'),
  github_contents_create: L('contents', 'Create contents', 'Create/update file'),
  github_contents_update: L('contents', 'Update contents', 'Update file'),
  github_contents_delete: L('contents', 'Delete contents', 'Delete file'),
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return { group: 'other', title: toolId, shortDescription: 'No description available.' };
}

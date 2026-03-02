/**
 * Tool groups and labels for the ClickUp MCP server Manual and Settings UI.
 */
export const TOOL_GROUP_ORDER = [
  'teams',
  'spaces',
  'folders',
  'lists',
  'tasks',
  'goals',
  'views',
  'custom_fields',
  'time_tracking',
  'webhooks',
  'users',
  'other',
];

export const TOOL_GROUP_LABELS = {
  teams: { title: 'Teams', description: 'List and get ClickUp teams (workspaces).' },
  spaces: { title: 'Spaces', description: 'Get spaces within a team.' },
  folders: { title: 'Folders', description: 'Get folders within a space.' },
  lists: { title: 'Lists', description: 'Get lists within a folder.' },
  tasks: { title: 'Tasks', description: 'Create, read, update, and delete tasks.' },
  goals: { title: 'Goals', description: 'Get goals for a team.' },
  views: { title: 'Views', description: 'Get team and list views.' },
  custom_fields: { title: 'Custom fields', description: 'Get custom fields for a list.' },
  time_tracking: { title: 'Time tracking', description: 'Get and create time entries.' },
  webhooks: { title: 'Webhooks', description: 'List, create, and delete webhooks.' },
  users: { title: 'Users', description: 'Get authorized team members.' },
  other: { title: 'Other', description: 'Other tools.' },
};

export const TOOL_LABELS = {
  clickup_get_authorized_teams: { group: 'teams', title: 'Get authorized teams', shortDescription: 'List teams (workspaces) you have access to.' },
  clickup_get_team: { group: 'teams', title: 'Get team', shortDescription: 'Get a team by ID.' },
  clickup_get_spaces: { group: 'spaces', title: 'Get spaces', shortDescription: 'Get spaces in a team.' },
  clickup_get_folders: { group: 'folders', title: 'Get folders', shortDescription: 'Get folders in a space.' },
  clickup_get_lists: { group: 'lists', title: 'Get lists', shortDescription: 'Get lists in a folder.' },
  clickup_get_list: { group: 'lists', title: 'Get list', shortDescription: 'Get a list by ID.' },
  clickup_get_tasks: { group: 'tasks', title: 'Get tasks', shortDescription: 'Get tasks in a list.' },
  clickup_get_task: { group: 'tasks', title: 'Get task', shortDescription: 'Get a task by ID.' },
  clickup_create_task: { group: 'tasks', title: 'Create task', shortDescription: 'Create a new task.' },
  clickup_update_task: { group: 'tasks', title: 'Update task', shortDescription: 'Update a task.' },
  clickup_delete_task: { group: 'tasks', title: 'Delete task', shortDescription: 'Delete a task.' },
  clickup_get_goals: { group: 'goals', title: 'Get goals', shortDescription: 'Get goals for a team.' },
  clickup_get_goal: { group: 'goals', title: 'Get goal', shortDescription: 'Get a goal by ID.' },
  clickup_get_team_views: { group: 'views', title: 'Get team views', shortDescription: 'Get views for a team.' },
  clickup_get_list_views: { group: 'views', title: 'Get list views', shortDescription: 'Get views for a list.' },
  clickup_get_custom_fields: { group: 'custom_fields', title: 'Get custom fields', shortDescription: 'Get custom fields for a list.' },
  clickup_get_time_entries: { group: 'time_tracking', title: 'Get time entries', shortDescription: 'Get time entries for a team.' },
  clickup_create_time_entry: { group: 'time_tracking', title: 'Create time entry', shortDescription: 'Create a time entry.' },
  clickup_get_webhooks: { group: 'webhooks', title: 'Get webhooks', shortDescription: 'Get webhooks for a team.' },
  clickup_create_webhook: { group: 'webhooks', title: 'Create webhook', shortDescription: 'Create a webhook.' },
  clickup_delete_webhook: { group: 'webhooks', title: 'Delete webhook', shortDescription: 'Delete a webhook.' },
  clickup_get_authorized_members: { group: 'users', title: 'Get authorized members', shortDescription: 'Get team members.' },
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return { group: 'other', title: toolId, shortDescription: 'No description available.' };
}

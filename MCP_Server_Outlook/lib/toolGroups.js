/**
 * Tool groups and labels for the Outlook MCP server.
 */
export const TOOL_GROUP_ORDER = [
  'mail',
  'calendar',
  'contacts',
  'other',
];

export const TOOL_GROUP_LABELS = {
  mail: {
    title: 'Mail',
    description: 'List folders, list/get/create/send/delete messages.',
  },
  calendar: {
    title: 'Calendar',
    description: 'List calendars and events; create, update, delete events.',
  },
  contacts: {
    title: 'Contacts',
    description: 'List contact folders and contacts; create, update, delete contacts.',
  },
  other: {
    title: 'Other',
    description: 'Other tools.',
  },
};

export const TOOL_LABELS = {
  outlook_list_mail_folders: { group: 'mail', title: 'List mail folders', shortDescription: 'List mail folders.' },
  outlook_list_messages: { group: 'mail', title: 'List messages', shortDescription: 'List messages in a folder.' },
  outlook_get_message: { group: 'mail', title: 'Get message', shortDescription: 'Get a message by ID.' },
  outlook_create_message: { group: 'mail', title: 'Create message', shortDescription: 'Create a draft message.' },
  outlook_send_message: { group: 'mail', title: 'Send message', shortDescription: 'Send a draft.' },
  outlook_delete_message: { group: 'mail', title: 'Delete message', shortDescription: 'Delete a message.' },
  outlook_list_calendars: { group: 'calendar', title: 'List calendars', shortDescription: 'List calendars.' },
  outlook_list_events: { group: 'calendar', title: 'List events', shortDescription: 'List calendar events.' },
  outlook_get_event: { group: 'calendar', title: 'Get event', shortDescription: 'Get an event by ID.' },
  outlook_create_event: { group: 'calendar', title: 'Create event', shortDescription: 'Create a calendar event.' },
  outlook_update_event: { group: 'calendar', title: 'Update event', shortDescription: 'Update an event.' },
  outlook_delete_event: { group: 'calendar', title: 'Delete event', shortDescription: 'Delete an event.' },
  outlook_list_contact_folders: { group: 'contacts', title: 'List contact folders', shortDescription: 'List contact folders.' },
  outlook_list_contacts: { group: 'contacts', title: 'List contacts', shortDescription: 'List contacts.' },
  outlook_get_contact: { group: 'contacts', title: 'Get contact', shortDescription: 'Get a contact by ID.' },
  outlook_create_contact: { group: 'contacts', title: 'Create contact', shortDescription: 'Create a contact.' },
  outlook_update_contact: { group: 'contacts', title: 'Update contact', shortDescription: 'Update a contact.' },
  outlook_delete_contact: { group: 'contacts', title: 'Delete contact', shortDescription: 'Delete a contact.' },
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return {
    group: 'other',
    title: toolId,
    shortDescription: 'No description available.',
  };
}

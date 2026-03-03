export const TOOL_GROUP_ORDER = ["playback", "search", "playlists", "other"];

export const TOOL_GROUP_LABELS = {
  playback: {
    title: "Playback",
    description:
      "Inspect and control the user’s current playback (play, pause, next/previous).",
  },
  search: {
    title: "Search",
    description: "Search for tracks, artists, albums, or playlists.",
  },
  playlists: {
    title: "Playlists",
    description: "Browse the user’s playlists.",
  },
  other: {
    title: "Other",
    description: "Other Spotify tools.",
  },
};

export const TOOL_LABELS = {
  spotify_get_current_playback: {
    group: "playback",
    title: "Get current playback",
    shortDescription: "Get the user’s current playback state.",
  },
  spotify_start_playback: {
    group: "playback",
    title: "Start playback",
    shortDescription: "Start or resume playback on a device.",
  },
  spotify_pause_playback: {
    group: "playback",
    title: "Pause playback",
    shortDescription: "Pause the current playback.",
  },
  spotify_next_track: {
    group: "playback",
    title: "Next track",
    shortDescription: "Skip to the next track.",
  },
  spotify_previous_track: {
    group: "playback",
    title: "Previous track",
    shortDescription: "Go back to the previous track.",
  },
  spotify_search: {
    group: "search",
    title: "Search Spotify",
    shortDescription: "Search for tracks, artists, albums, or playlists.",
  },
  spotify_get_user_playlists: {
    group: "playlists",
    title: "Get user playlists",
    shortDescription: "List the current user’s playlists.",
  },
};

export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return {
    group: "other",
    title: toolId,
    shortDescription: "No description available.",
  };
}


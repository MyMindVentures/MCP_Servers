import { spotifyRequest } from "../../lib/spotifyClient.js";

const executeFunction = async ({
  device_id,
  context_uri,
  uris,
  offset_uri,
  position_ms,
} = {}) => {
  const params = new URLSearchParams();
  if (device_id) params.set("device_id", device_id);
  const body = {};
  if (context_uri) body.context_uri = context_uri;
  if (Array.isArray(uris) && uris.length > 0) body.uris = uris;
  if (offset_uri) body.offset = { uri: offset_uri };
  if (typeof position_ms === "number") body.position_ms = position_ms;

  const path = `/me/player/play${params.toString() ? `?${params.toString()}` : ""}`;
  return spotifyRequest(path, {
    method: "PUT",
    body: Object.keys(body).length ? JSON.stringify(body) : undefined,
  });
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: "function",
    function: {
      name: "spotify_start_playback",
      description:
        "Start or resume the user’s playback. Optionally specify context (album/playlist) or track URIs and position.",
      parameters: {
        type: "object",
        properties: {
          device_id: {
            type: "string",
            description:
              "The id of the target device for playback. If omitted, uses the user’s currently active device.",
          },
          context_uri: {
            type: "string",
            description:
              "Spotify URI of the context to play (album, artist, or playlist). Example: 'spotify:album:...'.",
          },
          uris: {
            type: "array",
            items: { type: "string" },
            description:
              "Array of track URIs to play. Example: ['spotify:track:...']",
          },
          offset_uri: {
            type: "string",
            description:
              "URI of the item to start playback at within the context or given URIs list.",
          },
          position_ms: {
            type: "number",
            description:
              "Optional position in milliseconds to start playback at.",
          },
        },
        required: [],
      },
    },
  },
};


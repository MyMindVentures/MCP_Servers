import { spotifyRequest } from "../../lib/spotifyClient.js";

const executeFunction = async ({ limit = 20, offset = 0 } = {}) => {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  const path = `/me/playlists?${params.toString()}`;
  return spotifyRequest(path, { method: "GET" });
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: "function",
    function: {
      name: "spotify_get_user_playlists",
      description:
        "Get the current user’s playlists (for all scopes where this is allowed).",
      parameters: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description:
              "Maximum number of playlists to return (1-50). Default: 20.",
          },
          offset: {
            type: "number",
            description:
              "Index of the first playlist to return. Default: 0 (first page).",
          },
        },
        required: [],
      },
    },
  },
};


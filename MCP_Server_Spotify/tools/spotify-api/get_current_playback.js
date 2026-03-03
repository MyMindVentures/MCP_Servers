import { spotifyRequest } from "../../lib/spotifyClient.js";

const executeFunction = async ({ market } = {}) => {
  const params = new URLSearchParams();
  if (market) params.set("market", market);
  const query = params.toString();
  const path = `/me/player${query ? `?${query}` : ""}`;
  return spotifyRequest(path, { method: "GET" });
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: "function",
    function: {
      name: "spotify_get_current_playback",
      description:
        "Get information about the user’s current playback (currently playing track, context, device, etc.).",
      parameters: {
        type: "object",
        properties: {
          market: {
            type: "string",
            description:
              "An ISO 3166-1 alpha-2 country code. Optional; filters content to this market.",
          },
        },
        required: [],
      },
    },
  },
};


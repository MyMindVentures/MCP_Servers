import { spotifyRequest } from "../../lib/spotifyClient.js";

const executeFunction = async ({ device_id } = {}) => {
  const params = new URLSearchParams();
  if (device_id) params.set("device_id", device_id);
  const path = `/me/player/next${params.toString() ? `?${params.toString()}` : ""}`;
  return spotifyRequest(path, {
    method: "POST",
  });
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: "function",
    function: {
      name: "spotify_next_track",
      description: "Skip to the user’s next track in the queue.",
      parameters: {
        type: "object",
        properties: {
          device_id: {
            type: "string",
            description:
              "The id of the target device. If omitted, uses the user’s currently active device.",
          },
        },
        required: [],
      },
    },
  },
};


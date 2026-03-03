import { spotifyRequest } from "../../lib/spotifyClient.js";

const executeFunction = async ({
  query,
  type = "track",
  limit = 20,
  offset = 0,
  market,
}) => {
  const params = new URLSearchParams();
  params.set("q", query);
  params.set("type", type);
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  if (market) params.set("market", market);
  const path = `/search?${params.toString()}`;
  return spotifyRequest(path, { method: "GET" });
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: "function",
    function: {
      name: "spotify_search",
      description:
        "Search for tracks, artists, albums, or playlists on Spotify.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Search query keywords and optional field filters. Example: 'radiohead karma police'.",
          },
          type: {
            type: "string",
            description:
              "Comma-separated item types to search across. Any of: album, artist, playlist, track. Default: track.",
          },
          limit: {
            type: "number",
            description:
              "Maximum number of results per type (1-50). Default: 20.",
          },
          offset: {
            type: "number",
            description:
              "Index of the first result to return. Default: 0 (first page).",
          },
          market: {
            type: "string",
            description:
              "An ISO 3166-1 alpha-2 country code or 'from_token'. Filters content to this market.",
          },
        },
        required: ["query"],
      },
    },
  },
};


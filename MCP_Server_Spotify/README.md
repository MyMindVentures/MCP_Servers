# MCP Server — Spotify

MCP server that exposes a **subset of the Spotify Web API** for search and playback control. Use with MCP-compatible clients (e.g. Claude Desktop, Cursor).

## Prerequisites

- Node.js v18+ (for built-in `fetch`)
- A Spotify account
- A Spotify Web API OAuth access token with suitable scopes, for example:
  - `user-read-playback-state`
  - `user-modify-playback-state`
  - `playlist-read-private` (for listing playlists)

You can obtain an access token via the [Spotify Web API Console](https://developer.spotify.com/console/) or your own OAuth app.

## Setup

1. **Install dependencies**

   ```sh
   cd MCP_Server_Spotify
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and set:

   ```env
   SPOTIFY_ACCESS_TOKEN=your_spotify_oauth_access_token
   # Optional:
   # SPOTIFY_BASE_URL=https://api.spotify.com/v1
   # PORT=3001
   ```

   The access token must include scopes for the operations you intend to use (search, playback, playlists, etc.).

## Run

- **Stdio (recommended for Claude Desktop / Cursor)**:

  ```sh
  npm start
  ```

  Then configure your MCP client to run:

  ```json
  {
    "command": "node",
    "args": ["<absolute-path-to>/MCP_Server_Spotify/mcpServer.js"]
  }
  ```

- **Streamable HTTP** (optional):

  ```sh
  node mcpServer.js --streamable-http
  ```

  MCP endpoint: `http://127.0.0.1:${PORT:-3001}/mcp`

## Tools (Spotify API)

The server currently exposes these tools:

- `spotify_get_current_playback` – Get the user’s current playback state (currently playing track, context, device, etc.).
- `spotify_search` – Search for tracks, artists, albums, or playlists.
- `spotify_get_user_playlists` – Get the current user’s playlists.
- `spotify_start_playback` – Start or resume playback, optionally for a given context or list of track URIs.
- `spotify_pause_playback` – Pause the user’s playback.
- `spotify_next_track` – Skip to the next track.
- `spotify_previous_track` – Skip to the previous track.

You can list tools from the CLI with:

```sh
npm run list-tools
```

## Notes

- This server expects a **valid, non-expired** Spotify OAuth access token. When the token expires, renew it (or implement your own refresh flow) and update `SPOTIFY_ACCESS_TOKEN`.
- If a request fails, the MCP error message will include the Spotify error message when available.


function getSpotifyBaseUrl() {
  return process.env.SPOTIFY_BASE_URL || "https://api.spotify.com/v1";
}

function getSpotifyHeaders() {
  const token = process.env.SPOTIFY_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "SPOTIFY_ACCESS_TOKEN is not set. Set it in your .env file or environment."
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function spotifyRequest(path, options = {}) {
  const baseUrl = getSpotifyBaseUrl().replace(/\/+$/, "");
  const url = `${baseUrl}${path}`;
  const headers = {
    ...getSpotifyHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(url, { ...options, headers });

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!response.ok) {
    const message =
      json?.error?.message ||
      json?.error_description ||
      `Spotify API error (${response.status}): ${response.statusText}`;
    throw new Error(message);
  }

  return json ?? { ok: true };
}


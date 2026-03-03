import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './ManualInfo.css'

interface ToolMeta {
  id: string
  name: string
  title: string
  shortDescription: string
  group: string
  enabled?: boolean
}

interface ToolGroupMeta {
  id: string
  title: string
  description: string
  tools: ToolMeta[]
}

interface ServerMeta {
  name: string
  description: string
  publicUrl: string
  toolGroups: ToolGroupMeta[]
  tools: ToolMeta[]
  transportMode?: string
  availableTransports?: string[]
}

function ToolGroup({
  group,
  defaultOpen,
}: {
  group: ToolGroupMeta
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`manual__group ${open ? 'manual__group--open' : ''}`}>
      <button
        type="button"
        className="manual__group-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`manual-group-${group.id}`}
        id={`manual-group-btn-${group.id}`}
      >
        <span className="manual__group-chevron" aria-hidden />
        <span className="manual__group-title">{group.title}</span>
        <span className="manual__group-count">({group.tools.length})</span>
      </button>
      {group.description && (
        <p className="manual__group-desc">{group.description}</p>
      )}
      <div
        id={`manual-group-${group.id}`}
        role="region"
        aria-labelledby={`manual-group-btn-${group.id}`}
        className="manual__group-content"
      >
        <div className="manual__tools-grid">
          {group.tools.map((t) => (
            <article key={t.id} className="manual__tool-card">
              <div className="manual__tool-card-header">
                <span className="manual__tool-icon" aria-hidden>◇</span>
                <h3 className="manual__tool-name">{t.title}</h3>
                {t.enabled === false && (
                  <span className="manual__tool-badge manual__tool-badge--disabled">Uitgeschakeld</span>
                )}
              </div>
              <p className="manual__tool-desc">{t.shortDescription}</p>
              <code className="manual__tool-id" title="Toolnaam voor MCP">{t.name}</code>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ManualInfo() {
  const { getAuthHeader, user, logout } = useAuth()
  const [meta, setMeta] = useState<ServerMeta | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const headers: HeadersInit = {}
    const auth = getAuthHeader()
    if (auth) headers['Authorization'] = auth
    fetch('/meta', { headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load metadata'))))
      .then(setMeta)
      .catch((e) => setError(e.message))
  }, [getAuthHeader])

  function copyUrl() {
    if (!meta?.publicUrl) return
    navigator.clipboard.writeText(meta.publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (error) {
    return (
      <div className="manual manual--error">
        <div className="manual__error-card">
          <span className="manual__error-icon" aria-hidden>!</span>
          <h2 className="manual__error-title">Something went wrong</h2>
          <p className="manual__error-text">{error}</p>
          <Link to="/" className="manual__error-link">Back to home</Link>
        </div>
      </div>
    )
  }

  if (!meta) {
    return (
      <div className="manual manual--loading">
        <div className="manual__loader">
          <div className="manual__spinner" aria-hidden />
          <p className="manual__loading-text">Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="manual">
      <header className="manual__header">
        <div className="manual__header-inner">
          <Link to="/" className="manual__logo">MCP Server Airtable</Link>
          <div className="manual__header-actions">
            <Link to="/settings" className="manual__nav-link">Settings</Link>
            <span className="manual__user" title={user?.email ?? undefined}>{user?.username ?? user?.email ?? ''}</span>
            <button type="button" className="manual__logout" onClick={logout}>Sign out</button>
          </div>
        </div>
      </header>

      <main className="manual__main">
        <div className="manual__content">
          <section className="manual__section manual__hero">
            <h1 className="manual__title">{meta.name}</h1>
            <p className="manual__description">{meta.description}</p>
          </section>

          <section className="manual__section manual__url-section">
            <h2 className="manual__section-title">Public URL for MCP clients</h2>
            <div className="manual__url-box">
              <code className="manual__url-code">{meta.publicUrl}</code>
              <button
                type="button"
                className="manual__copy-btn"
                onClick={copyUrl}
                aria-label={copied ? 'Copied' : 'Copy URL'}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </section>

          <section className="manual__section">
            <h2 className="manual__section-title">How to connect MCP clients</h2>
            <p className="manual__section-intro">
              Use this server from different MCP-compatible clients. The examples below assume this server is reachable at the public URL shown above.
            </p>
            <p className="manual__section-intro">
              Current active transport mode:{' '}
              <span className="manual__pill">
                {meta.transportMode === 'sse'
                  ? 'Server-Sent Events (SSE)'
                  : meta.transportMode === 'stdio'
                    ? 'Stdio (CLI / desktop)'
                    : 'HTTP (streamable)'}
              </span>. You can change this on the Settings page; applying a new mode may restart the server.
            </p>
            <div className="manual__connection-grid">
              <article className="manual__connection-card">
                <h3 className="manual__connection-title">ChatGPT (SSE)</h3>
                {meta.transportMode === 'sse' && (
                  <span className="manual__connection-pill">Active mode</span>
                )}
                <p className="manual__connection-text">
                  Run the server in SSE mode:
                </p>
                <pre className="manual__code-block">
{`node mcpServer.js --sse`}
                </pre>
                <p className="manual__connection-text">
                  Then in ChatGPT&apos;s &quot;URL van MCP server&quot; field, use:
                </p>
                <pre className="manual__code-block">
{meta.publicUrl.replace(/\/mcp$/, '/sse')}
                </pre>
                <p className="manual__connection-note">
                  The SSE endpoint is always the same host as the public URL, but with <code>/sse</code> instead of <code>/mcp</code>.
                </p>
              </article>

              <article className="manual__connection-card">
                <h3 className="manual__connection-title">HTTP-based MCP clients</h3>
                {(!meta.transportMode || meta.transportMode === 'streamable-http') && (
                  <span className="manual__connection-pill">Active mode</span>
                )}
                <p className="manual__connection-text">
                  Run the server in Streamable HTTP mode:
                </p>
                <pre className="manual__code-block">
{`node mcpServer.js --streamable-http`}
                </pre>
                <p className="manual__connection-text">
                  Configure your MCP client to send JSON-RPC 2.0 POST requests to:
                </p>
                <pre className="manual__code-block">
{meta.publicUrl}
                </pre>
              </article>

              <article className="manual__connection-card">
                <h3 className="manual__connection-title">Stdio (Claude Desktop / Cursor)</h3>
                {meta.transportMode === 'stdio' && (
                  <span className="manual__connection-pill">Active mode</span>
                )}
                <p className="manual__connection-text">
                  Run the server without flags to use stdio:
                </p>
                <pre className="manual__code-block">
{`node mcpServer.js`}
                </pre>
                <p className="manual__connection-text">
                  Then point your MCP client to the <code>node</code> binary with <code>mcpServer.js</code> as the argument.
                </p>
              </article>
            </div>
          </section>

          <section className="manual__section">
            <h2 className="manual__section-title">Beschikbare tools ({meta.tools.length})</h2>
            <p className="manual__section-intro">Tools zijn gegroepeerd per onderdeel van de Airtable API. Klik op een groep om de tools te tonen of te verbergen.</p>
            {meta.toolGroups?.length > 0 ? (
              <div className="manual__groups">
                {meta.toolGroups.map((group) => (
                  <ToolGroup key={group.id} group={group} defaultOpen={group.id === meta.toolGroups[0]?.id} />
                ))}
              </div>
            ) : (
              <div className="manual__tools-grid">
                {meta.tools.map((t) => (
                  <article key={t.id} className="manual__tool-card">
                    <div className="manual__tool-card-header">
                      <span className="manual__tool-icon" aria-hidden>◇</span>
                      <h3 className="manual__tool-name">{t.title ?? t.name}</h3>
                      {t.enabled === false && (
                        <span className="manual__tool-badge manual__tool-badge--disabled">Uitgeschakeld</span>
                      )}
                    </div>
                    <p className="manual__tool-desc">{t.shortDescription}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="manual__footer">
        <Link to="/" className="manual__footer-link">← Home</Link>
        <span className="manual__credit">Invented by Parallax Studio</span>
      </footer>
    </div>
  )
}

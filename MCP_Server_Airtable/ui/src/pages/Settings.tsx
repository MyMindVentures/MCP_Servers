import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Settings.css'

interface ToolItem {
  id: string
  name: string
  title: string
  shortDescription: string
  group: string
  enabled: boolean
}

interface ToolGroupItem {
  id: string
  title: string
  description: string
  tools: ToolItem[]
}

interface SettingsMeta {
  name: string
  description: string
  publicUrl: string
  toolGroups: ToolGroupItem[]
  tools: ToolItem[]
  transportMode?: string
  availableTransports?: string[]
}

function SettingsGroup({
  group,
  enabledIds,
  toggleTool,
  defaultOpen,
}: {
  group: ToolGroupItem
  enabledIds: Set<string>
  toggleTool: (id: string) => void
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`settings__group ${open ? 'settings__group--open' : ''}`}>
      <button
        type="button"
        className="settings__group-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`settings-group-${group.id}`}
      >
        <span className="settings__group-chevron" aria-hidden />
        <span className="settings__group-title">{group.title}</span>
        <span className="settings__group-count">({group.tools.length})</span>
      </button>
      {group.description && (
        <p className="settings__group-desc">{group.description}</p>
      )}
      <div id={`settings-group-${group.id}`} className="settings__group-content">
        <ul className="settings__list">
          {group.tools.map((t) => (
            <li key={t.id} className="settings__row">
              <label className="settings__label">
                <input
                  type="checkbox"
                  className="settings__checkbox"
                  checked={enabledIds.has(t.id)}
                  onChange={() => toggleTool(t.id)}
                />
                <span className="settings__tool-name">{t.title}</span>
              </label>
              <p className="settings__tool-desc">{t.shortDescription}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Settings() {
  const { getAuthHeader, user, logout } = useAuth()
  const [meta, setMeta] = useState<SettingsMeta | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [enabledIds, setEnabledIds] = useState<Set<string>>(new Set())
  const [refreshing, setRefreshing] = useState(false)
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null)
  const [transportMode, setTransportMode] = useState<string | null>(null)
  const [restarting, setRestarting] = useState(false)

  useEffect(() => {
    const headers: HeadersInit = {}
    const auth = getAuthHeader()
    if (auth) headers['Authorization'] = auth
    fetch('/api/settings/tools', { headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load settings'))))
      .then((data) => {
        setMeta(data)
        setEnabledIds(new Set(data.tools.filter((t: ToolItem) => t.enabled).map((t: ToolItem) => t.id)))
        if (data.transportMode) {
          setTransportMode(data.transportMode)
        } else {
          setTransportMode('streamable-http')
        }
      })
      .catch((e) => setError(e.message))
  }, [getAuthHeader])

  function toggleTool(id: string) {
    setEnabledIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    if (!meta) return
    setEnabledIds(new Set(meta.tools.map((t) => t.id)))
  }

  function selectNone() {
    setEnabledIds(new Set())
  }

  async function refreshTools() {
    setRefreshing(true)
    setRefreshMessage(null)
    const headers: HeadersInit = {}
    const auth = getAuthHeader()
    if (auth) headers['Authorization'] = auth
    try {
      const res = await fetch('/api/settings/tools/refresh', { method: 'POST', headers })
      const data = await res.json()
      if (!res.ok) throw new Error((data && typeof data === 'object' && 'error' in data ? data.error : res.statusText) as string)
      setMeta(data as SettingsMeta)
      setEnabledIds(new Set(data.tools.filter((t: ToolItem) => t.enabled).map((t: ToolItem) => t.id)))
      setRefreshMessage(`Tool list updated. ${data.tools?.length ?? 0} tools loaded.`)
      setTimeout(() => setRefreshMessage(null), 5000)
    } catch (e) {
      setRefreshMessage(e instanceof Error ? e.message : 'Failed to update tools')
    } finally {
      setRefreshing(false)
    }
  }

  async function save() {
    if (!meta) return
    setSaving(true)
    setSaveSuccess(false)
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    const auth = getAuthHeader()
    if (auth) headers['Authorization'] = auth
    try {
      const res = await fetch('/api/settings/tools', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ enabled: Array.from(enabledIds) }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || res.statusText)
      }
      if (transportMode) {
        const resTransport = await fetch('/api/settings/transport', {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ mode: transportMode }),
        })
        if (!resTransport.ok) {
          const errTransport = await resTransport.json().catch(() => ({}))
          throw new Error(errTransport.error || resTransport.statusText)
        }
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function applyAndRestart() {
    setRestarting(true)
    setSaveSuccess(false)
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    const auth = getAuthHeader()
    if (auth) headers['Authorization'] = auth
    try {
      const res = await fetch('/api/settings/transport/apply', {
        method: 'POST',
        headers,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || res.statusText)
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to restart server')
    } finally {
      setRestarting(false)
    }
  }

  if (error && !meta) {
    return (
      <div className="settings settings--error">
        <div className="settings__error-card">
          <p className="settings__error-text">{error}</p>
          <Link to="/manual" className="settings__error-link">← Back to Manual</Link>
        </div>
      </div>
    )
  }

  if (!meta) {
    return (
      <div className="settings settings--loading">
        <div className="settings__loader">
          <div className="settings__spinner" aria-hidden />
          <p>Loading settings…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="settings">
      <header className="settings__header">
        <div className="settings__header-inner">
          <Link to="/" className="settings__logo">MCP Server Airtable</Link>
          <div className="settings__header-actions">
            <Link to="/manual" className="settings__nav-link">Manual</Link>
            <Link to="/change-password" className="settings__nav-link">Change password</Link>
            <span className="settings__user" title={user?.email ?? undefined}>{user?.username ?? user?.email ?? ''}</span>
            <button type="button" className="settings__logout" onClick={logout}>Sign out</button>
          </div>
        </div>
      </header>

      <main className="settings__main">
        <div className="settings__content">
          <h1 className="settings__title">Toolinstellingen</h1>
          <p className="settings__description">Schakel per groep in welke tools beschikbaar zijn voor MCP-clients. Uitgeschakelde tools verschijnen niet in de toollijst en kunnen niet worden aangeroepen.</p>

          <section className="settings__section">
            <h2 className="settings__section-title">Transportmodus</h2>
            <p className="settings__section-help">
              Kies welk MCP-transport deze server gebruikt. Voor gehoste omgevingen zoals Railway is HTTP (streamable) meestal de beste keuze.
            </p>
            <div className="settings__transport-options">
              {(meta.availableTransports ?? ['streamable-http', 'sse', 'stdio']).map((mode) => {
                const isActive = transportMode === mode
                let label = mode
                let hint = ''
                let description = ''
                if (mode === 'streamable-http') {
                  label = 'HTTP (streamable)'
                  hint = 'Aanbevolen voor gehoste servers'
                  description = 'Exporteert een /mcp HTTP-endpoint voor JSON-RPC 2.0-aanroepen.'
                } else if (mode === 'sse') {
                  label = 'Server-Sent Events (SSE)'
                  hint = 'Voor ChatGPT URL-MCP-clients'
                  description = 'Biedt een /sse-stream en /messages-endpoint voor SSE-gebaseerde MCP-clients.'
                } else if (mode === 'stdio') {
                  label = 'Stdio (CLI / desktop)'
                  hint = 'Voor lokale MCP-clients zoals Claude Desktop of Cursor'
                  description = 'Gebruikt stdin/stdout als transport. UI en HTTP-endpoints zijn niet beschikbaar in deze modus.'
                }
                return (
                  <label
                    key={mode}
                    className={`settings__transport-option${isActive ? ' settings__transport-option--active' : ''}`}
                  >
                    <input
                      type="radio"
                      className="settings__transport-input"
                      name="transport-mode"
                      value={mode}
                      checked={isActive}
                      onChange={() => setTransportMode(mode)}
                    />
                    <div className="settings__transport-body">
                      <div className="settings__transport-header">
                        <span className="settings__transport-label">{label}</span>
                        {isActive && <span className="settings__transport-pill">Actieve modus</span>}
                      </div>
                      {hint && <span className="settings__transport-hint">{hint}</span>}
                      {description && <p className="settings__transport-desc">{description}</p>}
                    </div>
                  </label>
                )
              })}
            </div>
            <p className="settings__section-note">
              De gekozen transportmodus wordt bewaard in de serverinstellingen. Gebruik &quot;Transport toepassen &amp; server herstarten&quot; om de nieuwe modus direct actief te maken.
            </p>
          </section>

          <div className="settings__actions">
            <button
              type="button"
              className="settings__btn settings__btn--refresh"
              onClick={refreshTools}
              disabled={refreshing}
              title="Reload the tool list from the server (e.g. after adding new tools or restarting the server)"
            >
              {refreshing ? 'Bijwerken…' : 'Tools bijwerken'}
            </button>
            <button type="button" className="settings__btn settings__btn--secondary" onClick={selectAll}>Alles inschakelen</button>
            <button type="button" className="settings__btn settings__btn--secondary" onClick={selectNone}>Alles uitschakelen</button>
            <button type="button" className="settings__btn settings__btn--primary" onClick={save} disabled={saving}>
              {saving ? 'Opslaan…' : 'Wijzigingen opslaan'}
            </button>
            <button
              type="button"
              className="settings__btn settings__btn--secondary"
              onClick={applyAndRestart}
              disabled={restarting}
            >
              {restarting ? 'Bezig met herstarten…' : 'Transport toepassen & server herstarten'}
            </button>
          </div>
          {saveSuccess && <p className="settings__success" role="status">Instellingen opgeslagen.</p>}
          {refreshMessage && <p className={refreshMessage.startsWith('Tool list') ? 'settings__success' : 'settings__refresh-error'} role="status">{refreshMessage}</p>}

          {meta.toolGroups?.length > 0 ? (
            <div className="settings__groups">
              {meta.toolGroups.map((group) => (
                <SettingsGroup
                  key={group.id}
                  group={group}
                  enabledIds={enabledIds}
                  toggleTool={toggleTool}
                  defaultOpen={group.id === meta.toolGroups[0]?.id}
                />
              ))}
            </div>
          ) : (
            <ul className="settings__list">
              {meta.tools.map((t) => (
                <li key={t.id} className="settings__row">
                  <label className="settings__label">
                    <input
                      type="checkbox"
                      className="settings__checkbox"
                      checked={enabledIds.has(t.id)}
                      onChange={() => toggleTool(t.id)}
                    />
                    <span className="settings__tool-name">{t.title ?? t.name}</span>
                  </label>
                  <p className="settings__tool-desc">{t.shortDescription}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="settings__footer">
        <Link to="/manual" className="settings__footer-link">← Manual</Link>
      </footer>
    </div>
  )
}

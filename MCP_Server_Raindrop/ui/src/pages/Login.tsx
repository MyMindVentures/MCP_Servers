import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/manual'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!usernameOrEmail.trim() || !password) {
      setError('Please enter username or email and password.')
      return
    }
    setLoading(true)
    const result = await login(usernameOrEmail.trim(), password)
    setLoading(false)
    if (result.ok) navigate(redirectTo, { replace: true })
    else setError(result.error || 'Invalid credentials.')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg" aria-hidden />
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Sign in</h1>
          <p className="auth-card__subtitle">MCP Server — Airtable Docs</p>
        </div>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          {error && <div className="auth-card__error" role="alert">{error}</div>}
          <label className="auth-field">
            <span className="auth-field__label">Username or email</span>
            <input
              type="text"
              className="auth-field__input"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              autoComplete="username"
              autoFocus
              disabled={loading}
            />
          </label>
          <label className="auth-field">
            <span className="auth-field__label">Password</span>
            <input
              type="password"
              className="auth-field__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={loading}
            />
          </label>
          <div className="auth-card__links">
            <Link to="/forgot-password" className="auth-card__link">Forgot password?</Link>
          </div>
          <button type="submit" className="auth-card__submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-card__footer">
          Don&apos;t have an account? <Link to="/signup" className="auth-card__link">Sign up</Link>
          {' · '}
          <Link to="/" className="auth-card__link">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

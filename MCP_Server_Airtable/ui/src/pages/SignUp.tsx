import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    const result = await signup(username.trim(), email.trim(), password)
    setLoading(false)
    if (result.ok) navigate('/manual', { replace: true })
    else setError(result.error || 'Sign up failed.')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg" aria-hidden />
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Create account</h1>
          <p className="auth-card__subtitle">MCP Server Airtable</p>
        </div>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          {error && <div className="auth-card__error" role="alert">{error}</div>}
          <label className="auth-field">
            <span className="auth-field__label">Username</span>
            <input
              type="text"
              className="auth-field__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              disabled={loading}
            />
          </label>
          <label className="auth-field">
            <span className="auth-field__label">Email</span>
            <input
              type="email"
              className="auth-field__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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
              autoComplete="new-password"
              disabled={loading}
            />
          </label>
          <label className="auth-field">
            <span className="auth-field__label">Confirm password</span>
            <input
              type="password"
              className="auth-field__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              disabled={loading}
            />
          </label>
          <button type="submit" className="auth-card__submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
        <p className="auth-card__footer">
          Already have an account? <Link to="/login" className="auth-card__link">Sign in</Link>
          {' · '}
          <Link to="/" className="auth-card__link">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

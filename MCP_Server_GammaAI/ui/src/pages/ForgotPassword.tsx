import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [resetLink, setResetLink] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    setResetLink(null)
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      setLoading(false)
      if (!res.ok) {
        setError(data.error || 'Request failed.')
        return
      }
      setMessage(data.message || 'If an account exists for this email, you will receive a reset link.')
      if (data.resetLink) setResetLink(data.resetLink)
    } catch {
      setLoading(false)
      setError('Network error.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg" aria-hidden />
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Forgot password</h1>
          <p className="auth-card__subtitle">Enter your email to receive a reset link</p>
        </div>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          {error && <div className="auth-card__error" role="alert">{error}</div>}
          {message && <div className="auth-card__success" role="status">{message}</div>}
          {resetLink && (
            <div className="auth-card__reset-link">
              <span className="auth-field__label">Reset link (use in development):</span>
              <a href={resetLink} className="auth-card__link" rel="noopener noreferrer">{resetLink}</a>
            </div>
          )}
          <label className="auth-field">
            <span className="auth-field__label">Email</span>
            <input
              type="email"
              className="auth-field__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              disabled={loading}
            />
          </label>
          <button type="submit" className="auth-card__submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
        <p className="auth-card__footer">
          <Link to="/login" className="auth-card__link">← Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}

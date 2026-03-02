import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './Login.css'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''
  const [token, setToken] = useState(tokenFromUrl)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const t = token.trim()
    if (!t) {
      setError('Reset token is required. Use the link from your email.')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: t, newPassword }),
      })
      const data = await res.json().catch(() => ({}))
      setLoading(false)
      if (!res.ok) {
        setError(data.error || 'Reset failed.')
        return
      }
      setSuccess(true)
    } catch {
      setLoading(false)
      setError('Network error.')
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-page__bg" aria-hidden />
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Password reset</h1>
            <p className="auth-card__success">Your password has been reset. You can now sign in.</p>
          </div>
          <p className="auth-card__footer">
            <Link to="/login" className="auth-card__link auth-card__submit">Sign in</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg" aria-hidden />
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Set new password</h1>
          <p className="auth-card__subtitle">Enter the token from your email and a new password</p>
        </div>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          {error && <div className="auth-card__error" role="alert">{error}</div>}
          <label className="auth-field">
            <span className="auth-field__label">Reset token</span>
            <input
              type="text"
              className="auth-field__input"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste the token from the reset link"
              disabled={loading}
            />
          </label>
          <label className="auth-field">
            <span className="auth-field__label">New password</span>
            <input
              type="password"
              className="auth-field__input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              disabled={loading}
            />
          </label>
          <label className="auth-field">
            <span className="auth-field__label">Confirm new password</span>
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
            {loading ? 'Resetting…' : 'Reset password'}
          </button>
        </form>
        <p className="auth-card__footer">
          <Link to="/login" className="auth-card__link">← Back to sign in</Link>
        </p>
      </div>
    </div>
  )
}

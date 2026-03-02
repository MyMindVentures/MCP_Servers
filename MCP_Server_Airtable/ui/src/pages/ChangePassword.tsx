import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function ChangePassword() {
  const { getAuthHeader } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (!currentPassword || !newPassword) {
      setError('Please fill in current and new password.')
      return
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }
    setLoading(true)
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    const auth = getAuthHeader()
    if (auth) headers['Authorization'] = auth
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers,
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json().catch(() => ({}))
      setLoading(false)
      if (!res.ok) {
        setError(data.error || 'Change password failed.')
        return
      }
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
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
          <h1 className="auth-card__title">Change password</h1>
          <p className="auth-card__subtitle">Enter your current password and choose a new one</p>
        </div>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          {error && <div className="auth-card__error" role="alert">{error}</div>}
          {success && <div className="auth-card__success" role="status">Password has been changed.</div>}
          <label className="auth-field">
            <span className="auth-field__label">Current password</span>
            <input
              type="password"
              className="auth-field__input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
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
            {loading ? 'Saving…' : 'Change password'}
          </button>
        </form>
        <p className="auth-card__footer">
          <Link to="/settings" className="auth-card__link">← Back to Settings</Link>
        </p>
      </div>
    </div>
  )
}

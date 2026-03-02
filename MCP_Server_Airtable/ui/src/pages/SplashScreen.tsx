import { Link } from 'react-router-dom'
import './SplashScreen.css'

const SERVER_NAME = 'MCP Server Airtable'
const TAGLINE = 'Connect AI assistants to your Airtable bases'
const DESCRIPTION = 'Lightweight MCP server that exposes Airtable Web API tools for listing bases, managing records, and syncing data. Secure, documented, and ready for enterprise integration.'

const FEATURES = [
  {
    title: 'Airtable integration',
    description: 'List bases, manage records, and sync data through a unified MCP interface.',
    icon: '◇',
  },
  {
    title: 'Enterprise-ready auth',
    description: 'Sign in with your credentials. Session-based access for docs and tools.',
    icon: '◆',
  },
  {
    title: 'Documented API',
    description: 'Full tool list and public URL for MCP clients. Copy and connect in seconds.',
    icon: '▣',
  },
]

export default function SplashScreen() {
  return (
    <div className="landing">
      <header className="landing__header">
        <div className="landing__header-inner">
          <Link to="/" className="landing__logo">MCP Server Airtable</Link>
          <nav className="landing__nav">
            <a href="#features" className="landing__nav-link">Features</a>
            <Link to="/manual" className="landing__nav-link">Docs</Link>
            <Link to="/login" className="landing__nav-link landing__nav-link--cta">Sign in</Link>
          </nav>
        </div>
      </header>

      <main className="landing__main">
        <div className="landing__hero-bg" aria-hidden />
        <section className="landing__hero">
          <p className="landing__badge">Model Context Protocol</p>
          <h1 className="landing__title">{SERVER_NAME}</h1>
          <p className="landing__tagline">{TAGLINE}</p>
          <p className="landing__description">{DESCRIPTION}</p>
          <div className="landing__cta-group">
            <Link to="/login" className="landing__cta landing__cta--primary">Sign in to Docs</Link>
            <Link to="/manual" className="landing__cta landing__cta--secondary">View Manual & Info</Link>
          </div>
        </section>

        <section id="features" className="landing__features">
          <h2 className="landing__features-title">Why use this server</h2>
          <div className="landing__features-grid">
            {FEATURES.map((f) => (
              <article key={f.title} className="feature-card">
                <span className="feature-card__icon" aria-hidden>{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__description">{f.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing__bottom-cta">
          <p className="landing__bottom-cta-text">Ready to connect your AI assistant?</p>
          <Link to="/login" className="landing__cta landing__cta--primary">Get started — Sign in</Link>
        </section>
      </main>

      <footer className="landing__footer">
        <div className="landing__footer-inner">
          <span className="landing__credit">Invented by Parallax Studio</span>
          <div className="landing__footer-links">
            <Link to="/" className="landing__footer-link">Home</Link>
            <Link to="/login" className="landing__footer-link">Sign in</Link>
            <Link to="/manual" className="landing__footer-link">Docs</Link>
            <Link to="/settings" className="landing__footer-link">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Hammer, BookOpen, BarChart3, Home, ChevronRight } from 'lucide-react'

function Layout({ children }) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/curriculum', icon: BookOpen, label: 'Curriculum' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        padding: '1.5rem',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 10,
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}>
            <Hammer size={28} color="var(--accent)" />
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                JS Forge
              </h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-2px' }}>
                Master JavaScript
              </p>
            </div>
          </Link>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={18} />
                {item.label}
                {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            )
          })}
        </nav>

        {/* Progress mini-widget */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'var(--bg-tertiary)',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-color)',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Overall Progress
          </p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: '12%' }} />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            4 / 36 lessons completed
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        marginLeft: '260px',
        flex: 1,
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  )
}

export default Layout

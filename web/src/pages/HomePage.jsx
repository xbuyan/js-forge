import React from 'react'
import { Link } from 'react-router-dom'
import { Play, BookOpen, Trophy, Zap, Target, Code2 } from 'lucide-react'

function HomePage() {
  const features = [
    {
      icon: Code2,
      title: 'Runnable Lessons',
      description: 'Every lesson includes starter code you can run immediately with js-forge run',
    },
    {
      icon: Target,
      title: 'Test-Driven',
      description: 'Write code that passes real tests. Submit with js-forge submit to track progress',
    },
    {
      icon: Zap,
      title: 'Production Patterns',
      description: 'Learn patterns used in real applications, not toy examples',
    },
    {
      icon: Trophy,
      title: 'Capstone Project',
      description: 'Build TaskForge — a full task management system for your portfolio',
    },
  ]

  const stats = [
    { label: 'Lessons', value: '36' },
    { label: 'Checkpoints', value: '12' },
    { label: 'Projects', value: '1' },
    { label: 'Duration', value: '12 Weeks' },
  ]

  return (
    <div style={{ padding: '3rem 2rem' }}>
      {/* Hero */}
      <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
        <div className="badge badge-warning" style={{ marginBottom: '1.5rem' }}>
          <Zap size={12} style={{ marginRight: '0.25rem' }} />
          12-Week Intensive Program
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em',
        }}>
          Forge Your JavaScript
          <span style={{ color: 'var(--accent)', display: 'block' }}>
            Mastery
          </span>
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          marginBottom: '2rem',
          lineHeight: 1.7,
        }}>
          A production-grade curriculum built like NeetCode. 
          Run lessons locally, pass tests, submit solutions, and build 
          a real project — all from your terminal.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/curriculum" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}>
            <Play size={18} />
            Start Learning
          </Link>
          <a 
            href="https://github.com/yourusername/js-forge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}
          >
            <BookOpen size={18} />
            View on GitHub
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '4rem',
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--accent)',
            }}>
              {stat.value}
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          How It Works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}>
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="card" style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  padding: '0.75rem',
                  background: 'rgba(245, 158, 11, 0.1)',
                  borderRadius: '0.75rem',
                }}>
                  <Icon size={24} color="var(--accent)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CLI Preview */}
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
          CLI-First Experience
        </h2>
        <div style={{
          background: 'var(--code-bg)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid var(--border-color)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.875rem',
          lineHeight: 1.8,
        }}>
          <div style={{ color: 'var(--text-muted)' }}>$ js-forge init</div>
          <div style={{ color: 'var(--success)' }}>✅ JS Forge initialized!</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>$ js-forge list</div>
          <div style={{ color: 'var(--text-primary)' }}>month-01/week-01/lesson-01 ⬜</div>
          <div style={{ color: 'var(--text-primary)' }}>month-01/week-01/lesson-02 ⬜</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>$ js-forge run month-01/week-01/lesson-01</div>
          <div style={{ color: 'var(--accent)' }}>🏃 Running starter code...</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>$ js-forge test month-01/week-01/lesson-01</div>
          <div style={{ color: 'var(--success)' }}>✅ 6/6 tests passed</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>$ js-forge submit month-01/week-01/lesson-01</div>
          <div style={{ color: 'var(--success)' }}>✅ Lesson submitted! Progress: 1/36</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

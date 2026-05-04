import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Trophy, 
  Target, 
  Zap, 
  Clock, 
  TrendingUp,
  Award,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock
} from 'lucide-react'

// Mock progress data (in production, this would be loaded from ~/.js-forge/progress.json)
const progressData = {
  totalLessons: 36,
  completedLessons: 4,
  totalCheckpoints: 12,
  completedCheckpoints: 1,
  currentStreak: 5,
  longestStreak: 12,
  totalStudyTime: 18.5, // hours
  averageScore: 94,
  badges: [
    { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', earned: true, icon: '👣' },
    { id: 'streak-3', name: 'On Fire', description: '3-day streak', earned: true, icon: '🔥' },
    { id: 'streak-7', name: 'Dedicated', description: '7-day streak', earned: false, icon: '💪' },
    { id: 'perfect-score', name: 'Perfectionist', description: '100% on any lesson', earned: true, icon: '💯' },
    { id: 'scope-master', name: 'Scope Master', description: 'Complete Month 1 Week 2', earned: false, icon: '🎯' },
    { id: 'async-whisperer', name: 'Async Whisperer', description: 'Complete all async lessons', earned: false, icon: '⚡' },
    { id: 'dom-surgeon', name: 'DOM Surgeon', description: 'Build 60fps virtual list', earned: false, icon: '🏥' },
    { id: 'full-stack', name: 'Full-Stack Ready', description: 'Complete final project', earned: false, icon: '🚀' },
  ],
  recentActivity: [
    { lesson: 'month-01/week-01/lesson-02', title: 'Data Types & Type Coercion', score: 100, time: '2 hours ago' },
    { lesson: 'month-01/week-01/lesson-01', title: 'Environment Detection & Variables', score: 100, time: '1 day ago' },
  ],
  monthlyProgress: [
    { month: 'Month 1', completed: 4, total: 12, percentage: 33 },
    { month: 'Month 2', completed: 0, total: 12, percentage: 0 },
    { month: 'Month 3', completed: 0, total: 12, percentage: 0 },
  ]
}

function StatCard({ icon: Icon, label, value, color, suffix = '' }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '0.75rem',
        background: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 0.75rem',
      }}>
        <Icon size={24} color={color} />
      </div>
      <p style={{
        fontSize: '1.875rem',
        fontWeight: 800,
        color: color,
        marginBottom: '0.25rem',
      }}>
        {value}{suffix}
      </p>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
      }}>
        {label}
      </p>
    </div>
  )
}

function ProgressPage() {
  const { totalLessons, completedLessons, badges, recentActivity, monthlyProgress } = progressData
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)
  const earnedBadges = badges.filter(b => b.earned)

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Your Progress
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track your journey from fundamentals to production-ready JavaScript.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              Overall Completion
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--accent)',
            }}>
              {overallProgress}%
            </p>
          </div>
        </div>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div 
            className="progress-bar-fill" 
            style={{ width: `${overallProgress}%` }} 
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <StatCard 
          icon={Target} 
          label="Lessons Done" 
          value={completedLessons} 
          color="var(--success)" 
        />
        <StatCard 
          icon={Zap} 
          label="Current Streak" 
          value={progressData.currentStreak} 
          color="var(--warning)"
          suffix=" days"
        />
        <StatCard 
          icon={Clock} 
          label="Study Time" 
          value={progressData.totalStudyTime} 
          color="var(--info)"
          suffix="h"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Avg Score" 
          value={progressData.averageScore} 
          color="var(--accent)"
          suffix="%"
        />
      </div>

      {/* Monthly Breakdown */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          Monthly Progress
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {monthlyProgress.map((month, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '0.75rem',
                background: month.percentage > 0 
                  ? 'rgba(245, 158, 11, 0.15)' 
                  : 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {month.percentage > 0 ? (
                  <Target size={24} color="var(--accent)" />
                ) : (
                  <Lock size={24} color="var(--text-muted)" />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ fontWeight: 600 }}>{month.month}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {month.completed}/{month.total} lessons
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${month.percentage}%` }} 
                  />
                </div>
              </div>

              <span style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: month.percentage > 0 ? 'var(--accent)' : 'var(--text-muted)',
              }}>
                {month.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
          <h2 style={{ fontSize: '1.25rem' }}>
            Achievement Badges
          </h2>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {earnedBadges.length}/{badges.length} earned
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}>
          {badges.map(badge => (
            <div 
              key={badge.id} 
              className="card"
              style={{
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.5,
                filter: badge.earned ? 'none' : 'grayscale(1)',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {badge.icon}
              </div>
              <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                {badge.name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {badge.description}
              </p>
              {badge.earned && (
                <div style={{
                  marginTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: 'var(--success)',
                  fontWeight: 600,
                }}>
                  <CheckCircle2 size={14} />
                  Earned
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          Recent Activity
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {recentActivity.map((activity, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.625rem',
                background: 'rgba(34, 197, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <CheckCircle2 size={20} color="var(--success)" />
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                  {activity.title}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {activity.time}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--success)',
                }}>
                  {activity.score}%
                </p>
                <Link 
                  to={`/lesson/${activity.lesson}`}
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  Review
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressPage

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Play, 
  Clock, 
  Zap,
  ChevronDown,
  ChevronRight,
  Target,
  Award
} from 'lucide-react'

// Curriculum data structure matching our repo
const curriculumData = [
  {
    month: 'month-01',
    title: 'Month 1: Core Foundations',
    subtitle: 'Master the Engine',
    description: 'Variables, types, control flow, functions, objects, arrays, equality',
    progress: 0,
    weeks: [
      {
        week: 'week-01',
        title: 'Week 1: Environment & Types',
        lessons: [
          { id: 'lesson-01', title: 'Environment Detection & Variables', difficulty: 'Easy', duration: '45 min', completed: false },
          { id: 'lesson-02', title: 'Data Types & Type Coercion', difficulty: 'Easy', duration: '60 min', completed: false },
          { id: 'lesson-03', title: 'Type Conversion & Validation', difficulty: 'Medium', duration: '75 min', completed: false },
        ]
      },
      {
        week: 'week-02',
        title: 'Week 2: Control Flow & Functions',
        lessons: [
          { id: 'lesson-04', title: 'Control Flow & Conditionals', difficulty: 'Easy', duration: '45 min', completed: false },
          { id: 'lesson-05', title: 'Functions & Scope', difficulty: 'Medium', duration: '60 min', completed: false },
          { id: 'lesson-06', title: 'Closures & Lexical Scoping', difficulty: 'Medium', duration: '90 min', completed: false },
        ]
      },
      {
        week: 'week-03',
        title: 'Week 3: Objects & Arrays',
        lessons: [
          { id: 'lesson-07', title: 'Object Mastery & this Binding', difficulty: 'Medium', duration: '75 min', completed: false },
          { id: 'lesson-08', title: 'Array Methods & Functional Programming', difficulty: 'Medium', duration: '90 min', completed: false },
          { id: 'lesson-09', title: 'Modern Collections (Map, Set, WeakMap)', difficulty: 'Hard', duration: '90 min', completed: false },
        ]
      },
      {
        week: 'week-04',
        title: 'Week 4: Equality & Debugging',
        lessons: [
          { id: 'lesson-10', title: 'Equality Comparisons Deep Dive', difficulty: 'Medium', duration: '60 min', completed: false },
          { id: 'lesson-11', title: 'Strict Mode & Best Practices', difficulty: 'Easy', duration: '45 min', completed: false },
          { id: 'lesson-12', title: 'Debugging with Chrome DevTools', difficulty: 'Medium', duration: '75 min', completed: false },
        ]
      }
    ],
    checkpoints: [
      { id: 'checkpoint-01', title: 'Variables & Types Assessment', type: 'quiz' },
      { id: 'checkpoint-02', title: 'Functions & Scope Challenge', type: 'coding' },
      { id: 'checkpoint-03', title: 'Data Structures Challenge', type: 'coding' },
      { id: 'checkpoint-04', title: 'CLI Analysis Tool Project', type: 'project' },
    ]
  },
  {
    month: 'month-02',
    title: 'Month 2: Advanced Patterns',
    subtitle: 'Master the Event Loop',
    description: 'Async programming, classes, modules, memory, browser APIs, testing',
    progress: 0,
    locked: true,
    weeks: [
      {
        week: 'week-05',
        title: 'Week 5: Asynchronous JavaScript',
        lessons: [
          { id: 'lesson-13', title: 'Event Loop & Task Queue', difficulty: 'Hard', duration: '90 min', completed: false },
          { id: 'lesson-14', title: 'Callbacks & Callback Hell', difficulty: 'Medium', duration: '75 min', completed: false },
          { id: 'lesson-15', title: 'Promises & async/await', difficulty: 'Hard', duration: '120 min', completed: false },
        ]
      },
      {
        week: 'week-06',
        title: 'Week 6: Classes & Modules',
        lessons: [
          { id: 'lesson-16', title: 'Class Syntax & Inheritance', difficulty: 'Medium', duration: '90 min', completed: false },
          { id: 'lesson-17', title: 'Module Systems (CJS vs ESM)', difficulty: 'Medium', duration: '75 min', completed: false },
          { id: 'lesson-18', title: 'Generators & Iterators', difficulty: 'Hard', duration: '90 min', completed: false },
        ]
      },
      {
        week: 'week-07',
        title: 'Week 7: Browser APIs',
        lessons: [
          { id: 'lesson-19', title: 'DOM Manipulation & Performance', difficulty: 'Medium', duration: '90 min', completed: false },
          { id: 'lesson-20', title: 'Storage APIs & Offline-First', difficulty: 'Hard', duration: '120 min', completed: false },
          { id: 'lesson-21', title: 'Web Workers & Concurrency', difficulty: 'Hard', duration: '90 min', completed: false },
        ]
      },
      {
        week: 'week-08',
        title: 'Week 8: Testing & Tooling',
        lessons: [
          { id: 'lesson-22', title: 'Unit Testing with Jest/Vitest', difficulty: 'Medium', duration: '90 min', completed: false },
          { id: 'lesson-23', title: 'Build Tools & Bundlers', difficulty: 'Medium', duration: '75 min', completed: false },
          { id: 'lesson-24', title: 'TypeScript Fundamentals', difficulty: 'Hard', duration: '120 min', completed: false },
        ]
      }
    ],
    checkpoints: [
      { id: 'checkpoint-05', title: 'Async Patterns Assessment', type: 'coding' },
      { id: 'checkpoint-06', title: 'Class Architecture Challenge', type: 'coding' },
      { id: 'checkpoint-07', title: 'Browser API Integration', type: 'coding' },
      { id: 'checkpoint-08', title: 'Library with Tests & Types', type: 'project' },
    ]
  },
  {
    month: 'month-03',
    title: 'Month 3: Integration & Capstone',
    subtitle: 'Build Production Systems',
    description: 'Component architecture, APIs, performance, security, final project',
    progress: 0,
    locked: true,
    weeks: [
      {
        week: 'week-09',
        title: 'Week 9: Frontend Architecture',
        lessons: [
          { id: 'lesson-25', title: 'Component System (Vanilla JS)', difficulty: 'Hard', duration: '120 min', completed: false },
          { id: 'lesson-26', title: 'State Management Patterns', difficulty: 'Hard', duration: '120 min', completed: false },
          { id: 'lesson-27', title: 'Client-Side Routing', difficulty: 'Hard', duration: '90 min', completed: false },
        ]
      },
      {
        week: 'week-10',
        title: 'Week 10: Full-Stack Integration',
        lessons: [
          { id: 'lesson-28', title: 'REST & GraphQL Consumption', difficulty: 'Medium', duration: '90 min', completed: false },
          { id: 'lesson-29', title: 'Authentication Patterns', difficulty: 'Hard', duration: '120 min', completed: false },
          { id: 'lesson-30', title: 'Real-Time Communication', difficulty: 'Hard', duration: '120 min', completed: false },
        ]
      },
      {
        week: 'week-11',
        title: 'Week 11: Performance & Security',
        lessons: [
          { id: 'lesson-31', title: 'Performance Optimization', difficulty: 'Hard', duration: '90 min', completed: false },
          { id: 'lesson-32', title: 'Accessibility (a11y)', difficulty: 'Medium', duration: '75 min', completed: false },
          { id: 'lesson-33', title: 'Security Hardening', difficulty: 'Hard', duration: '90 min', completed: false },
        ]
      },
      {
        week: 'week-12',
        title: 'Week 12: Final Project Sprint',
        lessons: [
          { id: 'final-project', title: 'TaskForge Capstone Project', difficulty: 'Expert', duration: '40 hours', completed: false, isProject: true },
        ]
      }
    ],
    checkpoints: [
      { id: 'checkpoint-09', title: 'Component Architecture Review', type: 'coding' },
      { id: 'checkpoint-10', title: 'API Integration Challenge', type: 'coding' },
      { id: 'checkpoint-11', title: 'Performance Audit', type: 'review' },
    ]
  }
]

function DifficultyBadge({ difficulty }) {
  const colors = {
    Easy: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e' },
    Medium: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b' },
    Hard: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444' },
    Expert: { bg: 'rgba(139, 92, 246, 0.15)', text: '#8b5cf6' },
  }
  const color = colors[difficulty] || colors.Easy

  return (
    <span style={{
      padding: '0.125rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: color.bg,
      color: color.text,
    }}>
      {difficulty}
    </span>
  )
}

function WeekSection({ week, monthId, isExpanded, onToggle, isLocked }) {
  const completedCount = week.lessons.filter(l => l.completed).length
  const totalLessons = week.lessons.length

  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      marginBottom: '0.75rem',
      opacity: isLocked ? 0.6 : 1,
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          background: 'var(--bg-card)',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: isLocked ? 'not-allowed' : 'pointer',
          fontSize: '0.9375rem',
          fontWeight: 600,
          textAlign: 'left',
        }}
      >
        {isLocked ? (
          <Lock size={18} color="var(--text-muted)" />
        ) : isExpanded ? (
          <ChevronDown size={18} color="var(--accent)" />
        ) : (
          <ChevronRight size={18} color="var(--text-muted)" />
        )}

        <span style={{ flex: 1 }}>{week.title}</span>

        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>
          {completedCount}/{totalLessons}
        </span>

        {completedCount === totalLessons && (
          <CheckCircle2 size={18} color="var(--success)" />
        )}
      </button>

      {isExpanded && !isLocked && (
        <div style={{ padding: '0.5rem' }}>
          {week.lessons.map(lesson => (
            <Link
              key={lesson.id}
              to={`/lesson/${monthId}/${week.week}/${lesson.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.875rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-tertiary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {lesson.completed ? (
                <CheckCircle2 size={20} color="var(--success)" />
              ) : lesson.isProject ? (
                <Award size={20} color="var(--accent)" />
              ) : (
                <Circle size={20} color="var(--border-color)" />
              )}

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  marginBottom: '0.25rem',
                }}>
                  {lesson.title}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} />
                    {lesson.duration}
                  </span>
                  <DifficultyBadge difficulty={lesson.difficulty} />
                </div>
              </div>

              <Play size={16} color="var(--text-muted)" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MonthCard({ monthData, expandedWeeks, onToggleWeek }) {
  const totalLessons = monthData.weeks.reduce((acc, w) => acc + w.lessons.length, 0)
  const completedLessons = monthData.weeks.reduce(
    (acc, w) => acc + w.lessons.filter(l => l.completed).length, 
    0
  )
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Month Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '0.75rem',
          background: monthData.locked 
            ? 'var(--bg-tertiary)' 
            : 'rgba(245, 158, 11, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {monthData.locked ? (
            <Lock size={24} color="var(--text-muted)" />
          ) : (
            <Target size={24} color="var(--accent)" />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
            {monthData.title}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {monthData.subtitle}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
            {Math.round(progress)}%
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {completedLessons}/{totalLessons} lessons
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* Weeks */}
      {monthData.weeks.map((week, idx) => (
        <WeekSection
          key={week.week}
          week={week}
          monthId={monthData.month}
          isExpanded={expandedWeeks.has(`${monthData.month}-${week.week}`)}
          onToggle={() => onToggleWeek(`${monthData.month}-${week.week}`)}
          isLocked={monthData.locked}
        />
      ))}

      {/* Checkpoints */}
      {monthData.checkpoints && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--bg-tertiary)',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-color)',
        }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
          }}>
            Checkpoints
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {monthData.checkpoints.map(cp => (
              <div key={cp.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0.875rem',
                background: 'var(--bg-card)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              }}>
                <Zap size={16} color="var(--accent)" />
                <span style={{ flex: 1 }}>{cp.title}</span>
                <span style={{
                  padding: '0.125rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  background: cp.type === 'project' 
                    ? 'rgba(139, 92, 246, 0.15)' 
                    : 'rgba(59, 130, 246, 0.15)',
                  color: cp.type === 'project' ? '#8b5cf6' : '#3b82f6',
                }}>
                  {cp.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CurriculumPage() {
  const [expandedWeeks, setExpandedWeeks] = useState(new Set(['month-01-week-01']))

  const toggleWeek = (key) => {
    const newSet = new Set(expandedWeeks)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.add(key)
    }
    setExpandedWeeks(newSet)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Curriculum Roadmap
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Follow the structured path from fundamentals to production-ready JavaScript. 
          Each lesson builds on the previous with real-world patterns.
        </p>
      </div>

      {curriculumData.map(month => (
        <MonthCard
          key={month.month}
          monthData={month}
          expandedWeeks={expandedWeeks}
          onToggleWeek={toggleWeek}
        />
      ))}
    </div>
  )
}

export default CurriculumPage

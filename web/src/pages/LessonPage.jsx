import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Terminal, 
  BookOpen,
  Lightbulb,
  ChevronRight,
  Clock,
  Zap
} from 'lucide-react'

// Lesson content database (in production, this would be fetched from markdown files)
const lessonDatabase = {
  'month-01/week-01/lesson-01': {
    title: 'Environment Detection & Variable Declarations',
    difficulty: 'Easy',
    duration: '45 min',
    description: 'Master runtime environment detection and variable declarations with hoisting awareness.',
    objectives: [
      'Understand JavaScript runtime environments (Node.js vs Browser)',
      'Master var, let, and const declarations',
      'Predict hoisting behavior accurately',
      'Write environment-agnostic code',
    ],
    content: `
## The Problem

You're building a universal logging utility that needs to work in both Node.js and the browser. The utility must:

1. Detect which environment it's running in
2. Use appropriate logging mechanism
3. Store configuration using the correct variable declaration type
4. Demonstrate understanding of hoisting

## Key Concepts

### Environment Detection

JavaScript runs in multiple environments. The most common are:

- **Node.js**: Has \`process\`, \`process.versions\`, no \`window\`
- **Browser**: Has \`window\`, \`document\`, no \`process\`
- **Deno**: Has \`Deno\` global, modern ES modules

### Variable Declarations

| Declaration | Scope | Hoisting | Reassignable | Redeclarable |
|-------------|-------|----------|--------------|--------------|
| \`var\` | Function | Yes (initialized undefined) | Yes | Yes |
| \`let\` | Block | Yes (TDZ) | Yes | No |
| \`const\` | Block | Yes (TDZ) | No | No |

### The Temporal Dead Zone (TDZ)

\`let\` and \`const\` are hoisted but not initialized. Accessing them before declaration throws a ReferenceError.

### The Classic Closure-in-Loop Problem

Using \`var\` in a loop creates one shared binding. All callbacks reference the same final value.

Using \`let\` creates a new binding per iteration. Each callback captures its own value.
    `,
    starterCode: `class UniversalLogger {
  constructor(config) {
    // TODO: Use the correct declaration type for config
    this.config = config;
    this.logCount = 0;
  }

  detectEnvironment() {
    // TODO: Implement environment detection
    throw new Error('Not implemented');
  }

  log(message, level = 'info') {
    // TODO: Implement logging with counter
    throw new Error('Not implemented');
  }

  demonstrateLoopScope() {
    // TODO: Show var vs let in loops
    return { varResults: [], letResults: [] };
  }

  hoistingDemo() {
    // TODO: Demonstrate hoisting behavior
    return { functionResult: '', tdzResult: '', afterDeclaration: '' };
  }
}

module.exports = { UniversalLogger };`,
    hints: [
      'Check for process and process.versions for Node.js. Check for window or document for browser.',
      'Ask yourself: "Will this value be reassigned?" If no → const. If yes, but only in block scope → let.',
      'Function declarations are hoisted entirely. let and const are hoisted but not initialized (Temporal Dead Zone).',
    ],
    testCount: 6,
    commands: {
      run: 'js-forge run month-01/week-01/lesson-01',
      test: 'js-forge test month-01/week-01/lesson-01',
      submit: 'js-forge submit month-01/week-01/lesson-01',
    }
  },
  'month-01/week-01/lesson-02': {
    title: 'Data Types & Type Coercion',
    difficulty: 'Easy',
    duration: '60 min',
    description: 'Build a type-safe data validation utility that handles JavaScript's coercion quirks.',
    objectives: [
      'Master all JavaScript primitive types',
      'Understand implicit vs explicit type coercion',
      'Predict coercion outcomes reliably',
      'Write type-safe code without TypeScript',
    ],
    content: `
## The Problem

You're building a data validation library for a form handling system. Users submit data as strings, but your backend expects proper types.

## Type Coercion Traps

\`\`\`javascript
"5" + 3        // "53" (string concatenation)
"5" - 3        // 2 (numeric subtraction)
[] == false    // true (array coercion)
null == undefined  // true (spec behavior)
\`\`\`

## typeof Quirks

| Value | typeof Result |
|-------|---------------|
| null | "object" (bug) |
| [] | "object" |
| NaN | "number" |
| undefined | "undefined" |
| function | "function" |

## Safe Conversion Strategy

Always validate before converting. Never trust implicit coercion in production code.
    `,
    starterCode: `class TypeGuard {
  safeConvert(value, targetType) {
    // TODO: Implement safe conversion
    throw new Error('Not implemented');
  }

  detectType(value) {
    // TODO: Better typeof
    throw new Error('Not implemented');
  }

  predictCoercion(a, b, operator) {
    // TODO: Predict JS coercion
    throw new Error('Not implemented');
  }

  validateForm(data, schema) {
    // TODO: Validate form data
    throw new Error('Not implemented');
  }
}

module.exports = { TypeGuard };`,
    hints: [
      'Use Array.isArray() or Object.prototype.toString.call() for array detection.',
      'NaN === NaN is false. Use Number.isNaN() or Object.is().',
      'For +: if either operand is string, concatenate. Otherwise, convert to number.',
    ],
    testCount: 10,
    commands: {
      run: 'js-forge run month-01/week-01/lesson-02',
      test: 'js-forge test month-01/week-01/lesson-02',
      submit: 'js-forge submit month-01/week-01/lesson-02',
    }
  }
}

function LessonPage() {
  const { lessonId } = useParams()
  const [activeTab, setActiveTab] = useState('content')
  const [showHint, setShowHint] = useState(null)

  // Parse lessonId from URL
  const fullPath = lessonId // This will be something like "month-01/week-01/lesson-01"
  const lesson = lessonDatabase[fullPath] || lessonDatabase['month-01/week-01/lesson-01']

  const tabs = [
    { id: 'content', label: 'Lesson', icon: BookOpen },
    { id: 'code', label: 'Starter Code', icon: Terminal },
    { id: 'hints', label: 'Hints', icon: Lightbulb },
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/curriculum" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            marginBottom: '1rem',
          }}
        >
          <ArrowLeft size={16} />
          Back to Curriculum
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: lesson.difficulty === 'Easy' 
                  ? 'rgba(34, 197, 94, 0.15)' 
                  : 'rgba(245, 158, 11, 0.15)',
                color: lesson.difficulty === 'Easy' ? '#22c55e' : '#f59e0b',
              }}>
                {lesson.difficulty}
              </span>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
              }}>
                <Clock size={14} />
                {lesson.duration}
              </span>
            </div>

            <h1 style={{ fontSize: '1.875rem', marginBottom: '0.75rem' }}>
              {lesson.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              {lesson.description}
            </p>
          </div>

          <button className="btn btn-primary" style={{ flexShrink: 0 }}>
            <CheckCircle2 size={18} />
            Mark Complete
          </button>
        </div>
      </div>

      {/* Objectives */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} color="var(--accent)" />
          Learning Objectives
        </h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {lesson.objectives.map((obj, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
            }}>
              <ChevronRight size={16} color="var(--accent)" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'content' && (
        <div className="card" style={{ fontSize: '0.9375rem', lineHeight: 1.8 }}>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: lesson.content
              .replace(/## (.*)/g, '<h2 style="font-size:1.25rem;margin:1.5rem 0 0.75rem;color:var(--text-primary)">$1</h2>')
              .replace(/### (.*)/g, '<h3 style="font-size:1.1rem;margin:1.25rem 0 0.5rem;color:var(--text-primary)">$1</h3>')
              .replace(/\`\`\`(\w+)?
([\s\S]*?)\`\`\`/g, '<pre style="background:var(--code-bg);padding:1rem;border-radius:0.5rem;overflow-x:auto;margin:1rem 0;font-size:0.875rem;line-height:1.6;border:1px solid var(--border-color)"><code>$2</code></pre>')
              .replace(/`([^`]+)`/g, '<code style="background:var(--code-bg);padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:0.875rem;color:var(--accent)">$1</code>')
              .replace(/\| (.*) \|/g, '<tr><td style="padding:0.5rem;border:1px solid var(--border-color)">$1</td></tr>')
              .replace(/
/g, '<br/>')
            }}
          />
        </div>
      )}

      {activeTab === 'code' && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              starter/index.js
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Edit this file in your editor
            </span>
          </div>
          <pre style={{
            background: 'var(--code-bg)',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            overflow: 'auto',
            fontSize: '0.875rem',
            lineHeight: 1.7,
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
          }}>
            <code>{lesson.starterCode}</code>
          </pre>
        </div>
      )}

      {activeTab === 'hints' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {lesson.hints.map((hint, i) => (
            <div key={i} className="card" style={{
              cursor: 'pointer',
              opacity: showHint === i ? 1 : 0.7,
            }} onClick={() => setShowHint(showHint === i ? null : i)}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: showHint === i ? '0.75rem' : 0,
              }}>
                <Lightbulb size={18} color="var(--accent)" />
                <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                  Hint {i + 1}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  {showHint === i ? 'Click to hide' : 'Click to reveal'}
                </span>
              </div>
              {showHint === i && (
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.9375rem',
                  paddingLeft: '2.25rem',
                }}>
                  {hint}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CLI Commands */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>
          CLI Commands
        </h3>
        <div style={{
          background: 'var(--code-bg)',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}>
          {Object.entries(lesson.commands).map(([cmd, value], i) => (
            <div key={cmd} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1.25rem',
              borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none',
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                width: '80px',
                flexShrink: 0,
              }}>
                {cmd}
              </span>
              <code style={{
                fontSize: '0.875rem',
                color: 'var(--accent)',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {value}
              </code>
              <button style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}>
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
      }}>
        <button className="btn btn-secondary">
          <ArrowLeft size={16} />
          Previous Lesson
        </button>
        <button className="btn btn-primary">
          Next Lesson
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default LessonPage

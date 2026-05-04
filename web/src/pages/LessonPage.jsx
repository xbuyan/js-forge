import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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

// Add CSS variable definitions (add to your global CSS file)
const globalStyles = `
  :root {
    --text-primary: #1a1a1a;
    --text-secondary: #4a4a4a;
    --text-muted: #6b7280;
    --accent: #3b82f6;
    --border-color: #e5e7eb;
    --code-bg: #f3f4f6;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --text-primary: #f9fafb;
      --text-secondary: #d1d5db;
      --text-muted: #9ca3af;
      --accent: #60a5fa;
      --border-color: #374151;
      --code-bg: #1f2937;
    }
  }
`;

// Lesson content database
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
    content: `## The Problem

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

Using \`let\` creates a new binding per iteration. Each callback captures its own value.`,
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
    description: "Build a type-safe data validation utility that handles JavaScript's coercion quirks.",
    objectives: [
      'Master all JavaScript primitive types',
      'Understand implicit vs explicit type coercion',
      'Predict coercion outcomes reliably',
      'Write type-safe code without TypeScript',
    ],
    content: `## The Problem

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

Always validate before converting. Never trust implicit coercion in production code.`,
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

// Helper function to safely render markdown-like content
const renderMarkdown = (content) => {
  if (!content) return '';
  
  let html = content;
  
  // Headers
  html = html.replace(/## (.*)/g, '<h2 style="font-size:1.25rem;margin:1.5rem 0 0.75rem;color:var(--text-primary)">$1</h2>');
  html = html.replace(/### (.*)/g, '<h3 style="font-size:1.1rem;margin:1.25rem 0 0.5rem;color:var(--text-primary)">$1</h3>');
  
  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre style="background:var(--code-bg);padding:1rem;border-radius:0.5rem;overflow-x:auto;margin:1rem 0;font-size:0.875rem;line-height:1.6;border:1px solid var(--border-color)"><code>${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:var(--code-bg);padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:0.875rem;color:var(--accent)">$1</code>');
  
  // Tables (simplified version)
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(cell => cell.trim());
    if (cells.some(cell => cell.includes('---'))) return ''; // Skip separator row
    if (cells.length === 0) return '';
    const rowHtml = '<tr>' + cells.map(cell => 
      `<td style="padding:0.5rem;border:1px solid var(--border-color)">${cell.trim()}</td>`
    ).join('') + '</tr>';
    return rowHtml;
  });
  
  // Wrap tables
  if (html.includes('<tr>')) {
    html = '<table style="border-collapse:collapse;width:100%;margin:1rem 0">' + html + '</table>';
  }
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Lists (basic)
  html = html.replace(/^\d+\. (.*)$/gm, '<li style="margin-left:1.5rem">$1</li>');
  html = html.replace(/^- (.*)$/gm, '<li style="margin-left:1.5rem">$1</li>');
  
  // Paragraphs (avoid wrapping headers and lists)
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<pre') || 
        para.startsWith('<table') || para.startsWith('<ul') ||
        para.startsWith('<li') || para.trim() === '') {
      return para;
    }
    return `<p style="margin-bottom:1rem">${para}</p>`;
  }).join('\n');
  
  return html;
};

const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('content');
  const [showHint, setShowHint] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState({});

  // Parse lessonId from URL with validation
  const fullPath = lessonId || 'month-01/week-01/lesson-01';
  const lesson = lessonDatabase[fullPath];
  
  // Handle missing lesson
  if (!lesson) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Lesson not found</h2>
        <Link to="/curriculum">Return to Curriculum</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'content', label: 'Lesson', icon: BookOpen },
    { id: 'code', label: 'Starter Code', icon: Terminal },
    { id: 'hints', label: 'Hints', icon: Lightbulb },
  ];

  const handleCopyCommand = async (command, commandName) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopyFeedback({ [commandName]: true });
      setTimeout(() => setCopyFeedback({}), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = command;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopyFeedback({ [commandName]: true });
      setTimeout(() => setCopyFeedback({}), 2000);
    }
  };

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
    // Here you would typically save to localStorage or backend
    localStorage.setItem(`lesson_${fullPath}_completed`, !isCompleted);
  };

  const handleNavigation = (direction) => {
    // Parse current lesson to find next/previous
    const lessons = Object.keys(lessonDatabase);
    const currentIndex = lessons.indexOf(fullPath);
    
    if (direction === 'next' && currentIndex < lessons.length - 1) {
      navigate(`/lesson/${lessons[currentIndex + 1]}`);
    } else if (direction === 'prev' && currentIndex > 0) {
      navigate(`/lesson/${lessons[currentIndex - 1]}`);
    }
  };

  // Load completion status from localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem(`lesson_${fullPath}_completed`) === 'true';
    setIsCompleted(completed);
  }, [fullPath]);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Inject styles */}
      <style>{globalStyles}</style>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/curriculum" 
          style={{
            display: 'inline-flex',
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
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
              flexWrap: 'wrap',
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

            <h1 style={{ fontSize: '1.875rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              {lesson.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              {lesson.description}
            </p>
          </div>

          <button 
            onClick={handleMarkComplete}
            className="btn btn-primary" 
            style={{ 
              flexShrink: 0,
              background: isCompleted ? '#22c55e' : undefined,
            }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Completed!' : 'Mark Complete'}
          </button>
        </div>
      </div>

      {/* Objectives */}
      <div className="card" style={{ 
        marginBottom: '1.5rem', 
        padding: '1.5rem',
        background: 'var(--code-bg)',
        borderRadius: '0.75rem',
        border: '1px solid var(--border-color)',
      }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <Zap size={18} color="var(--accent)" />
          Learning Objectives
        </h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0, paddingLeft: 0 }}>
          {lesson.objectives && lesson.objectives.map((obj, i) => (
            <li key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              listStyle: 'none',
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
        overflowX: 'auto',
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
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
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'content' && (
        <div className="card" style={{ 
          fontSize: '0.9375rem', 
          lineHeight: 1.8,
          padding: '1.5rem',
          background: 'var(--code-bg)',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
        }}>
          <div dangerouslySetInnerHTML={{ 
            __html: renderMarkdown(lesson.content || 'Content not available')
          }} />
        </div>
      )}

      {activeTab === 'code' && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              starter/index.js
            </span>
            <button
              onClick={() => handleCopyCommand(lesson.starterCode, 'code')}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {copyFeedback.code ? 'Copied!' : 'Copy Code'}
            </button>
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
          {lesson.hints && lesson.hints.map((hint, i) => (
            <div key={i} className="card" style={{
              cursor: 'pointer',
              padding: '1rem',
              background: 'var(--code-bg)',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-color)',
              opacity: showHint === i ? 1 : 0.85,
              transition: 'opacity 0.2s',
            }} onClick={() => setShowHint(showHint === i ? null : i)}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: showHint === i ? '0.75rem' : 0,
              }}>
                <Lightbulb size={18} color="var(--accent)" />
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
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
                  margin: 0,
                }}>
                  {hint}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CLI Commands */}
      {lesson.commands && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
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
                borderBottom: i < Object.keys(lesson.commands).length - 1 ? '1px solid var(--border-color)' : 'none',
                flexWrap: 'wrap',
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
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  flex: 1,
                }}>
                  {value}
                </code>
                <button 
                  onClick={() => handleCopyCommand(value, cmd)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: copyFeedback[cmd] ? '#22c55e' : 'var(--text-muted)',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                >
                  {copyFeedback[cmd] ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        gap: '1rem',
      }}>
        <button 
          onClick={() => handleNavigation('prev')}
          className="btn btn-secondary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: '0.375rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} />
          Previous Lesson
        </button>
        <button 
          onClick={() => handleNavigation('next')}
          className="btn btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '0.375rem',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Next Lesson
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default LessonPage
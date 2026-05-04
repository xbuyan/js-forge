# JS Forge 🔨

A **NeetCode-style**, interactive JavaScript course with a Go-powered CLI runner and a React web UI. Clone it, run it locally, learn JavaScript from fundamentals to production.

> **"Forge your JavaScript mastery through runnable lessons, production-shaped examples, and test-driven checkpoints."**

## Features

- 🖥️ **CLI-First**: Run, test, and submit lessons from your terminal
- 🧪 **Test-Driven**: Every lesson has automated tests you must pass
- 📊 **Progress Tracking**: Local progress stored in `~/.js-forge/progress.json`
- 🌐 **Web UI**: Browse curriculum, view lessons, track progress in a beautiful interface
- 🏗️ **Production Patterns**: Learn real-world patterns, not toy examples
- 🎯 **12 Checkpoints**: Self-evaluation with confidence metrics
- 🏆 **Achievement Badges**: Gamified learning experience
- 🔒 **Progressive Unlocking**: Complete lessons to unlock advanced topics

## Quick Start

### Prerequisites
- [Go 1.21+](https://go.dev/dl/)
- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/js-forge.git
cd js-forge
```

### 2. Build the CLI Runner

```bash
cd cmd/runner
go build -o js-forge
# Move to PATH or use alias
alias js-forge="$(pwd)/js-forge"
```

### 3. Initialize Course

```bash
js-forge init
```

### 4. Start Learning

```bash
# List all lessons
js-forge list

# Run a lesson starter code
js-forge run month-01/week-01/lesson-01

# Run tests against your solution
js-forge test month-01/week-01/lesson-01

# Submit when all tests pass
js-forge submit month-01/week-01/lesson-01

# Check progress
js-forge progress

# Get next lesson suggestion
js-forge next
```

### 5. Launch Web UI (Optional)

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the curriculum visually.

## Curriculum Structure

### Month 1: Core Foundations — "Master the Engine"
| Week | Topics | Lessons |
|------|--------|---------|
| Week 1 | Environment, Variables, Types | 3 lessons |
| Week 2 | Control Flow, Functions, Scope | 3 lessons |
| Week 3 | Objects, Arrays, Data Structures | 3 lessons |
| Week 4 | Equality, Strict Mode, Debugging | 3 lessons |

**Checkpoint**: Build a CLI analysis tool

### Month 2: Advanced Patterns — "Master the Event Loop"
| Week | Topics | Lessons |
|------|--------|---------|
| Week 5 | Async JS, Event Loop, Promises | 3 lessons |
| Week 6 | Classes, Modules, Generators | 3 lessons |
| Week 7 | DOM, Storage, Web Workers | 3 lessons |
| Week 8 | Testing, Bundlers, TypeScript | 3 lessons |

**Checkpoint**: Build a library with tests & types

### Month 3: Integration & Capstone — "Build Production Systems"
| Week | Topics | Lessons |
|------|--------|---------|
| Week 9 | Component Architecture, State, Routing | 3 lessons |
| Week 10 | APIs, Auth, Real-Time | 3 lessons |
| Week 11 | Performance, Accessibility, Security | 3 lessons |
| Week 12 | **TaskForge Capstone Project** | 1 project |

**Final Deliverable**: Production-ready task management system

## CLI Commands

| Command | Description |
|---------|-------------|
| `js-forge init` | Initialize progress tracking |
| `js-forge list` | List all available lessons |
| `js-forge next` | Suggest next lesson |
| `js-forge run <lesson>` | Run lesson starter code |
| `js-forge test <lesson>` | Run tests for a lesson |
| `js-forge submit <lesson>` | Submit solution & record progress |
| `js-forge progress` | Show overall progress |
| `js-forge hint <lesson>` | Show hints for a lesson |

## Project Structure

```
js-forge/
├── cmd/runner/           # Go CLI application
│   └── main.go
├── internal/
│   ├── validator/        # Exercise validation logic
│   ├── runtime/          # JS environment management
│   └── reporter/         # Progress reporting
├── curriculum/           # All course content
│   ├── month-01/
│   ├── month-02/
│   └── month-03/
├── shared/
│   └── test-utils/       # JavaScript test runner
├── web/                  # React web UI
│   ├── src/
│   └── package.json
├── go.mod
└── README.md
```

## How Lessons Work

Each lesson follows this structure:

```
lesson-XX/
├── README.md           # Lesson instructions & context
├── starter/
│   └── index.js        # Your starting point (TODOs inside)
├── solution/
│   └── index.js        # Reference solution (hidden)
└── tests/
    └── spec.js         # Automated test suite
```

1. Read the `README.md` to understand the problem
2. Implement the TODOs in `starter/index.js`
3. Run `js-forge test` to validate your solution
4. Submit with `js-forge submit` when all tests pass

## Web UI Features

- 📋 **Curriculum Roadmap**: Visual tree of all lessons with progress indicators
- 📖 **Lesson Viewer**: Read content, view starter code, reveal hints
- 📊 **Progress Dashboard**: Stats, badges, streaks, activity history
- 🔗 **Deep Links**: Direct URLs to any lesson (`/lesson/month-01/week-01/lesson-01`)

## 01edu Integration

This course is designed for the 01edu peer-learning model:

- **Pair Programming**: Complex topics (Closures, Promises) have suggested pair sessions
- **Peer Review**: Students review 2 peers' solutions per checkpoint
- **Mentorship**: Advanced students mentor after Month 1 completion
- **Gamification**: Achievement badges and streak tracking

## Roadmap Alignment

This curriculum follows the [roadmap.sh JavaScript Roadmap](https://roadmap.sh/javascript):

- ✅ Beginner topics (variables, types, control flow, functions)
- ✅ Intermediate topics (async, classes, modules, error handling)
- ✅ Advanced topics (memory, performance, security)
- ✅ Extended: Frontend architecture, full-stack integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your lesson following the template in `curriculum/TEMPLATE/`
4. Run tests: `go test ./...`
5. Submit a pull request

## License

MIT License — feel free to use for personal learning or institutional teaching.

---

**Start forging your JavaScript skills today.**

```bash
git clone https://github.com/yourusername/js-forge.git
cd js-forge && js-forge init && js-forge next
```

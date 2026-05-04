# JS Forge - Setup Guide

## Prerequisites

Before starting, ensure you have:

- **Go 1.21+** - [Download](https://go.dev/dl/)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

Verify installations:
```bash
go version      # Should show go1.21 or higher
node --version  # Should show v20 or higher
npm --version   # Should show 10 or higher
git --version
```

## Installation

### Option 1: Clone from GitHub (Recommended)

```bash
git clone https://github.com/yourusername/js-forge.git
cd js-forge
```

### Option 2: Download ZIP

1. Download `js-forge.zip` from releases
2. Extract to your preferred location
3. Open terminal in the extracted folder

## Build the CLI Runner

The CLI is written in Go and must be compiled:

```bash
# Build the binary
cd cmd/runner
go build -o ../../js-forge

# Or use Make from project root
make build
```

### Add to PATH (Optional)

**Linux/macOS:**
```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$PATH:/path/to/js-forge"

# Or create symlink
ln -s /path/to/js-forge/js-forge /usr/local/bin/js-forge
```

**Windows:**
```powershell
# Add to system PATH via Environment Variables
# Or use absolute path: .\js-forge.exe
```

## Initialize the Course

```bash
# Initialize progress tracking
./js-forge init

# Verify installation
./js-forge list
```

You should see all 36 lessons listed with ⬜ (not completed) status.

## Start Learning

### CLI Workflow

```bash
# See what's next
./js-forge next

# Run starter code for first lesson
./js-forge run month-01/week-01/lesson-01

# Edit the starter file in your editor
code curriculum/month-01/week-01/lesson-01/starter/index.js

# Test your solution
./js-forge test month-01/week-01/lesson-01

# Submit when all tests pass
./js-forge submit month-01/week-01/lesson-01

# Check progress
./js-forge progress
```

### Web UI (Optional but Recommended)

For a visual curriculum browser and progress dashboard:

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The web UI provides:
- 📋 Interactive curriculum roadmap
- 📖 Lesson content viewer with code highlighting
- 💡 Progressive hint reveal system
- 📊 Progress dashboard with badges
- 🔗 Deep links to any lesson

## Development Workflow

### Recommended Editor Setup

**VS Code:**
```json
{
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', monospace",
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.renderWhitespace": "boundary",
  "editor.rulers": [80, 120],
  "files.exclude": {
    "**/node_modules": true,
    "**/.js-forge": true
  }
}
```

**Recommended Extensions:**
- ESLint
- Prettier
- Go
- JavaScript (ES6) code snippets

### Daily Learning Routine

1. **Morning**: Run `js-forge next` to see today's lesson
2. **Read**: Open lesson README (web UI or markdown)
3. **Code**: Implement solution in starter file
4. **Test**: Run `js-forge test` until all pass
5. **Submit**: Run `js-forge submit` to record progress
6. **Review**: Check `js-forge progress` for motivation

### Time Expectations

| Activity | Time |
|----------|------|
| Easy lesson | 30-60 min |
| Medium lesson | 60-90 min |
| Hard lesson | 90-120 min |
| Checkpoint | 2-4 hours |
| Final project | 40+ hours |

## Troubleshooting

### "js-forge: command not found"

**Solution**: Use relative path or add to PATH
```bash
./js-forge init        # From project root
# OR
/path/to/js-forge init # Absolute path
```

### "node: command not found"

**Solution**: Ensure Node.js is installed and in PATH
```bash
# Check Node installation
which node
node --version

# If missing, reinstall from nodejs.org
```

### Tests fail with "ReferenceError"

**Solution**: You haven't implemented the function yet. Check:
1. Open `starter/index.js`
2. Replace `throw new Error('Not implemented')` with your code
3. Save and rerun tests

### "Cannot find module"

**Solution**: Ensure you're in the project root when running commands
```bash
cd /path/to/js-forge
./js-forge test month-01/week-01/lesson-01
```

### Web UI won't start

**Solution**: Check Node version and reinstall dependencies
```bash
cd web
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Updating the Course

When new lessons are released:

```bash
git pull origin main
make build
```

Your progress is stored in `~/.js-forge/progress.json` and will persist across updates.

## Next Steps

1. ✅ Install prerequisites
2. ✅ Build the CLI
3. ✅ Run `js-forge init`
4. ✅ Run `js-forge next`
5. 🚀 Start your first lesson!

---

**Need help?** Open an issue on GitHub or ask in the 01edu community.

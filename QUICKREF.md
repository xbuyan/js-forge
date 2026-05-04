# JS Forge - Quick Reference Card

## Essential Commands

```bash
# Initialize (run once)
js-forge init

# List all lessons
js-forge list

# Suggest next lesson
js-forge next

# Run starter code
js-forge run <lesson-path>

# Run tests
js-forge test <lesson-path>

# Submit solution
js-forge submit <lesson-path>

# Show progress
js-forge progress

# Show hint
js-forge hint <lesson-path>
```

## Lesson Path Format

```
month-01/week-01/lesson-01
month-01/week-02/lesson-04
month-02/week-05/lesson-13
month-03/week-12/final-project
```

## File Structure per Lesson

```
lesson-XX/
├── README.md      # Instructions
├── starter/
│   └── index.js   # Your code here
├── solution/
│   └── index.js   # Reference (hidden)
└── tests/
    └── spec.js    # Automated tests
```

## Web UI

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Progress Storage

```
~/.js-forge/
├── config.json    # Course settings
└── progress.json  # Your completion data
```

## Keyboard Shortcuts (Web UI)

| Key | Action |
|-----|--------|
| `j` | Next lesson |
| `k` | Previous lesson |
| `r` | Run code |
| `t` | Run tests |
| `h` | Toggle hints |
| `?` | Show help |

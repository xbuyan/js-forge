# TaskForge - Final Capstone Project

## Overview

Build a production-ready task management system using vanilla JavaScript. This project demonstrates mastery of all concepts covered in the course.

## Requirements

### Core Features
1. **User Authentication**
   - JWT-based auth with refresh tokens
   - Secure password handling (bcrypt)
   - Session persistence

2. **Project & Task Management**
   - CRUD for projects and tasks
   - Drag-and-drop task organization
   - Priority levels (low, medium, high, urgent)
   - Due dates with reminders
   - Tags and categories

3. **Real-Time Collaboration**
   - WebSocket-based live updates
   - Presence indicators (who's online)
   - Activity feed

4. **File Attachments**
   - Drag-and-drop file upload
   - Image preview
   - File type validation

5. **UI/UX**
   - Responsive design (mobile-first)
   - Dark/light theme toggle
   - Keyboard shortcuts
   - Accessibility (WCAG 2.1 AA)
   - Smooth animations (60fps)

### Technical Requirements
1. **Architecture**
   - Component-based vanilla JS (no frameworks)
   - Unidirectional data flow
   - Client-side routing
   - Service Worker for offline support

2. **Performance**
   - Lighthouse score >90 on all metrics
   - Bundle size <200KB (gzipped)
   - First Contentful Paint <1.5s
   - Time to Interactive <3.5s

3. **Testing**
   - >90% test coverage
   - Unit tests for all utilities
   - Integration tests for API
   - E2E tests for critical paths

4. **Security**
   - XSS prevention (CSP, input sanitization)
   - CSRF protection
   - Secure headers
   - No prototype pollution vulnerabilities

## Project Structure

```
taskforge/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route-level components
│   ├── services/         # API & WebSocket services
│   ├── stores/           # State management
│   ├── utils/            # Helpers & validators
│   ├── router/           # Client-side routing
│   └── styles/           # CSS variables & themes
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/
│   ├── icons/
│   └── manifest.json
├── server/               # Mock API server (Node.js)
├── package.json
├── vite.config.js
└── README.md
```

## Evaluation Rubric

| Category | Weight | Criteria |
|----------|--------|----------|
| Functionality | 25% | All features working, edge cases handled |
| Code Quality | 20% | Clean architecture, DRY, SOLID principles |
| Testing | 15% | Coverage >90%, meaningful tests, TDD evidence |
| Performance | 15% | Lighthouse >90, bundle <200KB, 60fps |
| Accessibility | 10% | Screen reader compatible, keyboard navigable |
| Security | 10% | No vulnerabilities, secure auth patterns |
| Documentation | 5% | Clear ADRs, API docs, setup guide |

## Getting Started

```bash
cd curriculum/month-03/week-12/final-project/scaffold
npm install
npm run dev        # Start dev server
npm run test       # Run tests
npm run build      # Production build
npm run lighthouse # Audit performance
```

## Submission

```bash
js-forge submit month-03/week-12/final-project
```

## Hints

1. Start with the data layer (stores) before building UI
2. Use the Observer pattern for state management
3. Implement routing before adding features
4. Test utilities before components
5. Use IndexedDB for offline data storage

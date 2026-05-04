# Checkpoint 4: CLI Analysis Tool Project

## Project: JS Analyzer CLI

Build a command-line tool that analyzes JavaScript files:

### Features
1. **Variable Analysis**
   - Detect var usage (should flag as warning)
   - Count let vs const ratio
   - Identify potential hoisting issues

2. **Type Safety Report**
   - Find implicit coercion risks
   - Flag == usage (recommend ===)
   - Detect typeof inconsistencies

3. **Complexity Metrics**
   - Cyclomatic complexity per function
   - Nesting depth analysis
   - Function length warnings

4. **Output Formats**
   - Console table
   - JSON report
   - HTML dashboard

### Requirements
- Use only Node.js built-ins (no external parsers)
- Handle single files and directories
- Respect .gitignore patterns
- Configurable via .jsanalyzerrc

### Evaluation
```bash
js-forge test month-01/checkpoint-04
js-forge submit month-01/checkpoint-04
```

## Self-Evaluation

```
□ I can parse JavaScript without external libraries
□ I understand AST concepts
□ I can build a CLI with argument parsing
□ I can generate multiple output formats
□ My tool handles edge cases gracefully
□ Time taken: ___ hours | Confidence (1-10): ___
```

package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

type Config struct {
	CurriculumDir string `json:"curriculumDir"`
	ProgressFile  string `json:"progressFile"`
}

type Progress struct {
	Completed []string          `json:"completed"`
	Scores    map[string]int    `json:"scores"`
	Times     map[string]float64 `json:"times"`
}

type TestResult struct {
	Lesson    string    `json:"lesson"`
	Passed    int       `json:"passed"`
	Failed    int       `json:"failed"`
	Total     int       `json:"total"`
	Duration  float64   `json:"duration"`
	Errors    []string  `json:"errors,omitempty"`
}

func main() {
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	cmd := os.Args[1]

	switch cmd {
	case "run":
		if len(os.Args) < 3 {
			fmt.Println("Usage: js-forge run <lesson-path>")
			os.Exit(1)
		}
		runLesson(os.Args[2])
	case "test":
		if len(os.Args) < 3 {
			fmt.Println("Usage: js-forge test <lesson-path>")
			os.Exit(1)
		}
		runTests(os.Args[2])
	case "submit":
		if len(os.Args) < 3 {
			fmt.Println("Usage: js-forge submit <lesson-path>")
			os.Exit(1)
		}
		submitLesson(os.Args[2])
	case "progress":
		showProgress()
	case "list":
		listLessons()
	case "next":
		suggestNext()
	case "hint":
		if len(os.Args) < 3 {
			fmt.Println("Usage: js-forge hint <lesson-path>")
			os.Exit(1)
		}
		showHint(os.Args[2])
	case "init":
		initCourse()
	default:
		fmt.Printf("Unknown command: %s\n", cmd)
		printUsage()
		os.Exit(1)
	}
}

func printUsage() {
	fmt.Println(`JS Forge - Interactive JavaScript Course Runner

Usage:
  js-forge init              Initialize course progress tracking
  js-forge list              List all available lessons
  js-forge next              Suggest the next lesson to complete
  js-forge run <lesson>      Run a lesson starter code
  js-forge test <lesson>     Run tests for a lesson
  js-forge submit <lesson>   Submit solution and record progress
  js-forge progress          Show overall progress
  js-forge hint <lesson>     Show a hint for the current lesson

Examples:
  js-forge run month-01/week-01/lesson-01
  js-forge test month-01/week-01/lesson-01
  js-forge submit month-01/week-01/lesson-01`)
}

func loadConfig() Config {
	home, _ := os.UserHomeDir()
	configPath := filepath.Join(home, ".js-forge", "config.json")

	data, err := os.ReadFile(configPath)
	if err != nil {
		return Config{
			CurriculumDir: "curriculum",
			ProgressFile:  filepath.Join(home, ".js-forge", "progress.json"),
		}
	}

	var cfg Config
	json.Unmarshal(data, &cfg)
	return cfg
}

func loadProgress() Progress {
	cfg := loadConfig()

	data, err := os.ReadFile(cfg.ProgressFile)
	if err != nil {
		return Progress{
			Completed: []string{},
			Scores:    make(map[string]int),
			Times:     make(map[string]float64),
		}
	}

	var p Progress
	json.Unmarshal(data, &p)
	if p.Scores == nil {
		p.Scores = make(map[string]int)
	}
	if p.Times == nil {
		p.Times = make(map[string]float64)
	}
	return p
}

func saveProgress(p Progress) {
	cfg := loadConfig()
	os.MkdirAll(filepath.Dir(cfg.ProgressFile), 0755)

	data, _ := json.MarshalIndent(p, "", "  ")
	os.WriteFile(cfg.ProgressFile, data, 0644)
}

func initCourse() {
	home, _ := os.UserHomeDir()
	forgeDir := filepath.Join(home, ".js-forge")
	os.MkdirAll(forgeDir, 0755)

	cfg := Config{
		CurriculumDir: "curriculum",
		ProgressFile:  filepath.Join(forgeDir, "progress.json"),
	}

	data, _ := json.MarshalIndent(cfg, "", "  ")
	os.WriteFile(filepath.Join(forgeDir, "config.json"), data, 0644)

	progress := Progress{
		Completed: []string{},
		Scores:    make(map[string]int),
		Times:     make(map[string]float64),
	}
	saveProgress(progress)

	fmt.Println("✅ JS Forge initialized!")
	fmt.Println("   Progress will be tracked in:", cfg.ProgressFile)
}

func runLesson(lessonPath string) {
	cfg := loadConfig()
	starterPath := filepath.Join(cfg.CurriculumDir, lessonPath, "starter", "index.js")

	if _, err := os.Stat(starterPath); os.IsNotExist(err) {
		fmt.Printf("❌ Lesson not found: %s\n", starterPath)
		fmt.Println("   Run 'js-forge list' to see available lessons")
		os.Exit(1)
	}

	fmt.Printf("🏃 Running: %s\n", lessonPath)
	fmt.Println(strings.Repeat("-", 50))

	cmd := exec.Command("node", starterPath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Run()
}

func runTests(lessonPath string) TestResult {
	cfg := loadConfig()
	testPath := filepath.Join(cfg.CurriculumDir, lessonPath, "tests", "spec.js")
	starterPath := filepath.Join(cfg.CurriculumDir, lessonPath, "starter", "index.js")

	if _, err := os.Stat(testPath); os.IsNotExist(err) {
		fmt.Printf("❌ No tests found for: %s\n", lessonPath)
		os.Exit(1)
	}

	fmt.Printf("🧪 Testing: %s\n", lessonPath)
	fmt.Println(strings.Repeat("-", 50))

	start := time.Now()

	// Run tests using Node.js with our custom test runner
	testRunner := filepath.Join("shared", "test-utils", "runner.js")
	cmd := exec.Command("node", testRunner, starterPath, testPath)
	output, err := cmd.CombinedOutput()

	duration := time.Since(start).Seconds()

	var result TestResult
	result.Lesson = lessonPath
	result.Duration = duration

	// Parse test output
	outputStr := string(output)
	lines := strings.Split(outputStr, "\n")

	for _, line := range lines {
		if strings.Contains(line, "PASS") {
			result.Passed++
			result.Total++
		} else if strings.Contains(line, "FAIL") {
			result.Failed++
			result.Total++
			result.Errors = append(result.Errors, strings.TrimSpace(line))
		}
	}

	fmt.Println(outputStr)
	fmt.Println(strings.Repeat("-", 50))
	fmt.Printf("Results: %d/%d passed", result.Passed, result.Total)
	if result.Failed > 0 {
		fmt.Printf(" (%d failed)", result.Failed)
	}
	fmt.Printf(" in %.2fs\n", duration)

	return result
}

func submitLesson(lessonPath string) {
	result := runTests(lessonPath)

	if result.Failed > 0 {
		fmt.Println("\n❌ Cannot submit: tests are failing")
		fmt.Println("   Fix the errors and try again: js-forge test", lessonPath)
		os.Exit(1)
	}

	progress := loadProgress()

	// Check if already completed
	alreadyCompleted := false
	for _, c := range progress.Completed {
		if c == lessonPath {
			alreadyCompleted = true
			break
		}
	}

	if !alreadyCompleted {
		progress.Completed = append(progress.Completed, lessonPath)
	}

	progress.Scores[lessonPath] = 100
	progress.Times[lessonPath] = result.Duration

	saveProgress(progress)

	fmt.Println("\n✅ Lesson submitted successfully!")
	fmt.Printf("   Score: 100%% | Time: %.2fs\n", result.Duration)
	fmt.Printf("   Progress: %d/%d lessons completed\n", len(progress.Completed), countTotalLessons())
}

func showProgress() {
	progress := loadProgress()
	total := countTotalLessons()
	completed := len(progress.Completed)
	percentage := 0
	if total > 0 {
		percentage = (completed * 100) / total
	}

	fmt.Println("📊 Your Progress")
	fmt.Println(strings.Repeat("=", 50))
	fmt.Printf("Completed: %d/%d lessons (%d%%)\n", completed, total, percentage)
	fmt.Println()

	if len(progress.Completed) > 0 {
		fmt.Println("Completed lessons:")
		for _, lesson := range progress.Completed {
			score := progress.Scores[lesson]
			fmt.Printf("  ✅ %s (score: %d%%)\n", lesson, score)
		}
	}
}

func listLessons() {
	cfg := loadConfig()
	progress := loadProgress()

	fmt.Println("📚 Available Lessons")
	fmt.Println(strings.Repeat("=", 60))

	months := []string{"month-01", "month-02", "month-03"}
	monthNames := map[string]string{
		"month-01": "Month 1: Core Foundations",
		"month-02": "Month 2: Advanced Patterns",
		"month-03": "Month 3: Integration & Capstone",
	}

	for _, month := range months {
		fmt.Printf("\n%s\n", monthNames[month])
		fmt.Println(strings.Repeat("-", 40))

		monthPath := filepath.Join(cfg.CurriculumDir, month)
		weeks, _ := os.ReadDir(monthPath)

		for _, week := range weeks {
			if !week.IsDir() || !strings.HasPrefix(week.Name(), "week-") {
				continue
			}

			weekPath := filepath.Join(monthPath, week.Name())
			lessons, _ := os.ReadDir(weekPath)

			for _, lesson := range lessons {
				if !lesson.IsDir() || !strings.HasPrefix(lesson.Name(), "lesson-") {
					continue
				}

				lessonPath := filepath.Join(month, week.Name(), lesson.Name())
				completed := false
				for _, c := range progress.Completed {
					if c == lessonPath {
						completed = true
						break
					}
				}

				status := "⬜"
				if completed {
					status = "✅"
				}

				fmt.Printf("  %s %s\n", status, lessonPath)
			}
		}
	}
}

func suggestNext() {
	progress := loadProgress()

	allLessons := getAllLessons()
	for _, lesson := range allLessons {
		completed := false
		for _, c := range progress.Completed {
			if c == lesson {
				completed = true
				break
			}
		}
		if !completed {
			fmt.Printf("🎯 Next lesson: %s\n", lesson)
			fmt.Printf("   Run: js-forge run %s\n", lesson)
			return
		}
	}

	fmt.Println("🎉 Congratulations! You've completed all lessons!")
	fmt.Println("   Start the final project: curriculum/month-03/week-12/final-project")
}

func showHint(lessonPath string) {
	cfg := loadConfig()
	hintPath := filepath.Join(cfg.CurriculumDir, lessonPath, "README.md")

	data, err := os.ReadFile(hintPath)
	if err != nil {
		fmt.Println("No hints available for this lesson")
		return
	}

	content := string(data)
	// Extract hint section
	if idx := strings.Index(content, "## Hints"); idx != -1 {
		hintSection := content[idx:]
		if endIdx := strings.Index(hintSection, "## "); endIdx > 0 {
			hintSection = hintSection[:endIdx]
		}
		fmt.Println(hintSection)
	} else {
		fmt.Println("No hints section found in lesson README")
	}
}

func countTotalLessons() int {
	return len(getAllLessons())
}

func getAllLessons() []string {
	cfg := loadConfig()
	var lessons []string

	months := []string{"month-01", "month-02", "month-03"}
	for _, month := range months {
		monthPath := filepath.Join(cfg.CurriculumDir, month)
		weeks, _ := os.ReadDir(monthPath)

		for _, week := range weeks {
			if !week.IsDir() || !strings.HasPrefix(week.Name(), "week-") {
				continue
			}

			weekPath := filepath.Join(monthPath, week.Name())
			lessonDirs, _ := os.ReadDir(weekPath)

			for _, lesson := range lessonDirs {
				if !lesson.IsDir() || !strings.HasPrefix(lesson.Name(), "lesson-") {
					continue
				}

				lessons = append(lessons, filepath.Join(month, week.Name(), lesson.Name()))
			}
		}
	}

	return lessons
}

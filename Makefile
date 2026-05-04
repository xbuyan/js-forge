.PHONY: build test install dev clean

# Build the CLI runner
build:
	cd cmd/runner && go build -o ../../js-forge

# Run Go tests
test:
	go test ./...

# Install CLI to GOPATH/bin
install:
	cd cmd/runner && go install

# Start web UI dev server
dev:
	cd web && npm install && npm run dev

# Build web UI for production
build-web:
	cd web && npm run build

# Clean build artifacts
clean:
	rm -f js-forge
	rm -rf web/dist
	rm -rf web/node_modules

# Initialize course for development
init:
	go run cmd/runner/main.go init

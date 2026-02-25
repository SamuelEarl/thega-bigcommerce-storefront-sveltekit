.PHONY: dev kill build

dev:
	bun --bun run dev

build:
	bun --bun run build

# Run the built app
build-preview:
	bun --bun run start

generate-css-icons:
	bun --bun generate-css-icons.js

# This will kill the process running on port 3333 on your local computer.
kill:
	fuser -k 3333/tcp

run-dev:
	bun --bun run dev

run-build:
	bun --bun run build

# Run the built app
run-start:
	bun --bun run start

generate-css-icons:
	bun --bun generate-css-icons.js

# This will kill the process running on port 3000 on your local computer.
kill-process:
	fuser -k 3000/tcp

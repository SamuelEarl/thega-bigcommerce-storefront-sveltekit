dev:
	bun --bun run dev

build:
	bun --bun run build

generate-css-icons:
	bun --bun generate-css-icons.js

# This will kill the process running on port 3000 on your local computer.
kill-process:
	fuser -k 3000/tcp

all:
    @echo "Nothing to do for all."

dev:
    npm run dev

dev-live: build
    npx live-server dist --entry-file=index.html

build:
    npm run build


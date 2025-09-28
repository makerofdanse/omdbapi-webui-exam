all:
    @echo "Nothing to do for all."

restore:
    #!/usr/bin/env bash
    if [[ ! -d ./node_modules ]]; then
        echo "just: restoring project... 🤩"
        npm install
        echo "just: project restored ✅"
    fi

dev: restore
    npm run dev

dev-live: build
    npx live-server dist --entry-file=index.html

build: restore
    @echo "just: starting build... 😴"
    @npm run build
    @echo "just: build finished ✅"

clean-dist:
    #!/usr/bin/env bash
    if [[ -d ./dist ]]; then
        rm -r ./dist
        echo "just: dist cleaned ✅"
    else
        echo "just: no dist to clean 😉"
    fi

deploy: clean-dist build
    @echo "just: deploying to remote gh-pages branch... 🥰"
    @npx gh-pages -d dist
    @echo "just: project deployed ✅"

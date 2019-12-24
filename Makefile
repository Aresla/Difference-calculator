install:
	install-deps

install-deps:
	npm install

publish:
	npm publish --dry-run

build:
	rm -rf dist
	npm run build

lint:
	npx eslint .

test:
	npm test

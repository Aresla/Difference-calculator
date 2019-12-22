install:    	install-deps

install-deps:
		npm install

publish:
		npm publish --dry-run

lint:
		npx eslint .

test-coverage:
  npm test -- --coverage

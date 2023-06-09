# Expense Tracker Service

This project will work as a backend service for expense tracker application

## Setting and starting up the project locally

This project has been developed with node-v18.13.0 and npm-v8.19.3

1. Install dependencies using npm

```bash
npm install
```

2. Run docker compose to boot up mongodb and redis

```bash
docker-compose up -d
```

3. Start the application

```bash
npm run dev
```

4. You can run linter and check for any lint issue

```bash
npm run lint
npm run lint:fix
```

5. You can also run test cases and check for coverage

```bash
npm run test
```

#### Setting up ESLint and Prettier

Install dependencies and peer-dependencies

```bash
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node

npx install-peerdeps --dev eslint-config-airbnb
```

Install VSCode extensions to check for errors on the go

1. ESLint
2. Prettier

For reference, you can check:

1. [AirBnb](https://www.npmjs.com/package/eslint-config-airbnb)

2. [Prettier](https://prettier.io/)

3. [ESLint rules](https://eslint.org/docs/rules/)

#### Setting up husky

Requires npm>7

```bash
npx husky-init && npm install
```

You will get a tree like structure with husky/pre-commit file

If you want to add other hook like pre-push with npm run test command, execute

```bash
npx husky add .husky/pre-commit "npm run test"
```

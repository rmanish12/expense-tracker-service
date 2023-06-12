# Expense Tracker Service

This project will work as a backend service for expense tracker application

## Setting up database

1. Run docker compose to spin up mongo db

```bash
docker-compose up -d
```

2. Connect DB with Mongo Atlas tool and login with the user and password mentioned in docker compose file

3. Open mongosh from the bottom left corner

4. Create database and admin user for that database

```bash
use expense-tracker

db.createUser(
  {
   user: ["your-username"],
   pwd: ["your-password"],
   roles: [ "readWrite"]
  })
```

5. Create .env file and set up the following variables

```bash
APP_PORT=<PORT YOU WANT YOUR SERVER TO RUN ON>
DB_USER=<DB USER YOU CREATED>
DB_PASSWORD=<DB PASSWORD FOR THAT USER>
DB_HOST=localhost
DB_PORT=27017
DB_NAME=expense-tracker
ALLOWED_ORIGIN=http://localhost:3000
```

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

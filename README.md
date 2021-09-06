<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Using [Nest](https://github.com/nestjs/nest) framework TypeScript as starter repository.  
Application also use [Yarn](https://yarnpkg.com/) for installing dependencies and trigger scripts. Include Docker and docker-compose configurations for easy deployment.

---

---

## Installation

First you need to create required configuration files for database and environment: .env and ormconfig.json  
Repository include examples for this files in root directory.

### .env example:

```
PORT=8080
DB_PASS=password
DB_USER=username
DB_NAME=users-avatar-db
```

### ormconfig.json example:

```
[
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "your_db_name",
    "entities": [
      "dist/**/*.entity{ .ts,.js}"
    ],
    "synchronize": false,
    "migrations": [
      "dist/src/database/migrations/*{.ts,.js}"
    ],
    "migrationsTableName": "migrations_typeorm",
    "migrationsRun": true
  }
]
```

---

### Hint

If you're start application in docker-compose, with node.js and postgres database in containers - change postgres host from **_localhost_** to **_postgres_**

---

---

## Setup docker deployment

For build and start application use:

```bash
$ sudo docker-compose --env-file=./.env up -d --build
```

For show logs after compile use:

```bash
$ sudo docker-compose --env-file=./.env logs -f
```

---

## Local deployment

For install dependencies you can use both yarn and npm (preferably yarn)

```bash
$ yarn
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# build sources
$ yarn build

# production mode
$ yarn start:prod
```

---

---

## TypeORM Migrations

Application supports TypeORM migrations, which placed in **src/database/migrations** directory and can be created/generated/migrated with default TypeORM commands.  
Create new migration file:

```
npx typeorm migration:create -n CreateUsersTable -d src/database/migrations
```

Generate automaticaly migration by changes in your entities:

```
npx typeorm migration:generate -n AddColumnToUsers -d src/database/migrations
```

Migrate all pending migrates:

```
npx typeorm migration:run
```

---

### Hint

When starting application in container, migrations will be applied automaticaly, when building application locally it will be applied automatically too, but for better expirience, in developing you would better use manualy **migration:run** command.

---

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

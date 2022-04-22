# RESTful Service

> Demo app

<!-- GETTING STARTED -->

## Installing / Getting started

- Source: Backend and Frontend
- Running app bundle via server.
- Endpoint: `http://localhost:9000`

## Development setup

### Backend Built With

- Framework ExpressJS v4.
- Validation API with Joi and fastest validator.
- Validate and generate default config environment.
- Storage data on MongoDB.
- Data Source built with Apollo datasource and Dataloader.
- Caching result data with Redis.
- Logging in winston.
- Compiler with Babel ES6.

### Frontend Built With
- ReactJS with Material UI.
- Connect to restful api via Apollo Rest Link
- Build app via Parcel bundle.
- Validation Material Form

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- NodeJS v16.x to up

- MongoDB v4.x

- Redis v5.x

### Running using Docker Compose

1. Setup environment variables.
   Create environment config file

```sh
   cp .env.production .env
```


2. Start with docker-compose

```
   docker-compose up -d --build
```

3. Clean all containers in docker-compose

```
   docker-compose down
```

### Setting up

Follow all step bellow to setup your dev environment

1. Setup as `Installing / Getting started`

2. Start your environment (We are using Docker for environment setup)

3. Setup environment variables.
   Create environment config file and config `mongo` and `redis` connection params

```sh
   cp .env.example .env

```

4. Install NPM packages

```sh
   yarn install
```

5. Run development:

```sh
   yarn dev
```

### Building

Run build command

```shell
$ yarn build
```

### Deploying / Publishing

Push your code to your branch with format `[__YOUR_USERNAME__]/[__FEATURE__]`

```shell
$ git add .
$ git commit -m "__COMMIT_MESSAGE__"
$ git push origin [__YOUR_USERNAME__]/[__FEATURE__]
```

Then go to repository server and make a pull request to branch `development`.

**IMPORTANT**: Don't push anything to `master` by yourself. A CI tool will run all step and merge to `master` for you.

## Production setup

- Install dependencies in production

```sh
yarn install --production=true
```

## Documentation

- Using swagger doc
- Document: http://localhost:9000/documentation
- Health Check: http://localhost:9000/health

## Configuration

On `.env`, you must config all environment variables bellow. By default, `.env.example` is used default config for all service.

## Versioning

- [Current] `beta`: All code is on `master`

- v1.0.0



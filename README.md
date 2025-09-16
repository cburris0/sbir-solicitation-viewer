# SBIR Solicitation Viewer
View latest SBIR solicitations and their topics

## To configure local environment variables
```sh
# apps/api-server/.env
PORT=8080
DATABASE_URL=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
```

```sh
# apps/web/.env
NEXT_PUBLIC_API_SERVER_URL=http: /localhost:8080 
```

```sh
# packages/database/.env
DATABASE_URL=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres 
```

## To start database
From the project root, run:
```sh
docker compose up
```

From /packages/database, run the following to migrate database
```sh
pnpm run generate
pnpm run migrate
```

## To start application
From project root, run the following to start api server and web server
```sh
npm i -G pnpm
pnpm i
pnpm dev
```

After the server is running, load solicitation data with the following
```sh
pnpm run load-data
```

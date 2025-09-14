# SBIR Solicitation Viewer
View latest SBIR solicitations and their topics

## To start database
From the project root, run:
```sh
docker compose up
```

From /packages/database, run the following to migrate database
```sh
pnpm run migrate
```

## To start application
From project root, run the following to start api server and web server
```sh
npm i -G pnpm
pnpm i
pnpm dev
```

After the server is running, you can call the SBIR data scraper with the following:
```sh
pnpm run load-data
```

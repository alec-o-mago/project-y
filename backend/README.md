# BackEnd Service

This is a backend service using ExpressJS, Sequelize, PostgreSQL, Swagger and Jest.

## How to install

- Install and configure a PostgreSQL server
- Set the PostgreSQL connection URL on the `.env` file.
- Change the JTW secret key for any long random string on `.env` for safety reasons.
- Run `npm install` on this folder

## How to run

```bash
npx run dev
```

Open [http://localhost:3000/swagger](http://localhost:3000/swagger) on your browser.

## Testing

```bash
npm run test
# Currenly needs fixing
```

## Documentation

While the server is running, go to the '/swagger' route.

## What's Missing?

- Fix all the Jest tests
- Deploy this app

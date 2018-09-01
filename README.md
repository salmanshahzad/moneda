# Moneda
Budgeting Made Easy

## Requirements
Moneda requires [Node.js >=7.6](https://nodejs.org/en/) and [PostgreSQL >=9.4](https://www.postgresql.org/) to be installed.

## Installation
Navigate to the folder where Moneda was downloaded.

Create a file named `.env` and insert the following keys:
- PORT - the port the server will listen on
- BASE - the base directory where Moneda will be hosted
- SECRET - a secret passphrase used to sign authorization tokens
- DB_USER - your PostgreSQL username
- DB_PASSWORD - your PostgreSQL password
- DB_NAME - your PostgreSQL database name
- DB_HOST - your PostgreSQL host
- DB_PORT - your PostgreSQL port

The file should look like this (with your values inserted after the =).
```
PORT=3000
BASE=/
SECRET=secret
DB_USER=user
DB_PASSWORD=password
DB_NAME=moneda
DB_HOST=localhost
DB_PORT=5432
```

Create the necessary tables by importing `setup.sql` inside the `psql` prompt.
```
\i setup.sql
```

Install dependencies and build.
```
cd client
npm install
npm run build
cd ../server
npm install
npm start
```

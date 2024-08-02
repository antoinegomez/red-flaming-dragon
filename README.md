# Cynomi tech task 

## Introduction

Sleep tracking test task fullstack app.

The project is using nestjs for the server and vite bundler with react on the client.

Server port is assumed to be 3000 for the client to work.


https://github.com/user-attachments/assets/cfb50c02-f23b-4346-a048-0769a9641eaa



## In this app

- Entry of a new sleep tracking
- List of all entries
- Pagination throught results
- View graph of last 7 entries

## Technical decisions

- Used Zod to create schemas to validate data

It is not used everywhere yet but the next steps would be to have a better integration with nestjs, which apparently not ideal for now.
One plugin got archived recently so need to roll our own.

Zod can also be used to validate all responses: your api should not answer with bad data.

Frontend is using Zod to validate incoming data and to have typesafe frontend.
There is no guess needed to know what types we are dealing with.

The schema validation is done bluntly and could provoke an app crash if invalid data is here. Should have been handled better. See below.

- Wish: Using TRPc could also be a good choice for a fullstack app to have type safety and streamlined dev. REST APIs are OK choice but
not needed if not exposing it to the public.

- Error handling is not perfect: Better error handling would be needed on the frontend and also backend. 

Return better errors for validation input, see Zod integration above, and client should handle errors gracefully by displaying nice error
messages or page given the context of the error.

- No auth implemented. For the scope of this task it was assumed to be already logged in.

Otherwise I would have use authjs and an external provider like Github, Discord or else.

- No security audit done. Did not have the time to check for XSS, CSRF attack vectors and protect the app against it.

- The app is also vulnerable to DDoS, espacilly on the create entry endpoint

- No check for the tracked date entry

There is zero check on the date provided. User can select a future date or date already entered.


## Installation

*Server*

NestJS app.
Migrations are already generated but you can still run the generate command, won't do anything.
Then run the migrate command to create database schema.

```bash
cd server
npm install
npm run generate
npm run migrate
```

```bash
cd ../client
npm install
```

## Dev mode

*Server*

```bash
cd server
npm start:dev
```

*Client*

```bash
cd client
npm run dev

## Run tests

Only supported for server

```bash
cd server
npm test
```


## Inject fake data

If you want to try out the app with loads of fake data you can invoke the script that will fill up the database with fake data:

```bash
cd server
npx tsx src/database/create-fake-data.ts
```

## Production build


*Server*

```bash
cd server
npm run build
npm start
```

*Client*

```bash
npm run build
npm run preview
```


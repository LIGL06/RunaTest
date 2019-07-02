# RunaTest
This is a simple React/PostresSQL app for employees/admin checkout times.

### Quickstart

The following commands will install dependencies, start the docker containers for mysql and start the application in development mode.

```bash
$ npm install
$ docker-compose up -d
````
Access http://localhost:8080 and create database `runatest` with the credentials:

DB Motor: `PostreSQL`,
Server: `db`,
Username: `postgres`,
Password: `passw0rd`

````bash
$ npm run migrate
$ npm run dev
```

### Production

The following commands will install dependencies, start the docker containers for mysql and start the application in production mode.

```bash
$ npm run build
$ docker-compose up -d
$ npm run start
```

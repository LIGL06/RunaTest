# RunaTest
This is a simple React/PostresSQL app for employees/admin checkout times.

### Quickstart

The following commands will install dependencies, start the docker containers for mysql and start the application in development mode.

```bash
$ npm install
$ docker-compose up -d
```
Access http://localhost:8080 and create database `runatest` with the credentials:

DB Motor: `PostreSQL`,
Server: `db`,
Username: `postgres`,
Password: `passw0rd`

```bash
$ npm run migrate
$ npm run dev
```
Access http://localhost:8080 and create a user on `runatest.users` with the credentials:

DB Motor: `PostreSQL`,
Server: `db`,
Username: `postgres`,
Password: `passw0rd`,
Database: `runatest`

Create an Admin User on `New Record`: 

email: `demo@demo.com`,
password: `$2b$10$Qluv36uT0G5jkRYKGIOZO.9wqX/lqAgsQJFaN5o8QkQIvxqg2DI8W`, (demo)
legalName: `Administrador`,
legalRfc: `SAMPLERFC`,
admin: `checked`,
created_at: `now`

Access http://localhost:8081 or Access http://localhost:8082 depending on the free ports WebPack Picks. 

Enter with the credentials:

email: `demo@demo.com`,
password: `demo`

You should log In and access Employees, Records, Employee Info.

### Production

The following commands will install dependencies, start the docker containers for mysql and start the application in production mode.

```bash
$ npm run build
$ docker-compose up -d
$ npm run start
```

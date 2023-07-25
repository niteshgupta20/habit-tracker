# Habit tracker

## Getting Started

- clone the repository

```
git clone <git url>
```

- Install dependencies

```
npm install
```

- Build and run the project

```
npm  start
```

- open the application

```
Run localhost:8000 on chrome browser.
```

## About Project

Habit tracker app, where we can define habits and track them.

## Project Structure

The folder structure of this app is explained below:

| Name                     | Description                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| **assests**              | Contains static files css and javascript                                                           |
| **node_modules**         | Contains all npm dependencies                                                                      |
| **config**/middleware.js | Contains source code that will used for flash messages                                             |
| **config**/mongoose.js   | connect to mongoDB database via mongoose ORM.                                                      |
| **controllers**          | Controllers define functions to serve various express routes.                                      |
| **routes**               | Contain all express routes                                                                         |
| **models**               | Models define schemas that will be used in storing and retrieving data from habit-tracker database |
| **views**                | ejs file which served by routes.    |
| app.js                   | Entry point to express app          |
| package.json             | Contains npm dependencies as well as build scripts       |

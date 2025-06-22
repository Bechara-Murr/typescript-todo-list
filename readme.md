# TODO List

A simple todo list built with typescript. Vite is used to serve the typescript file to avoid building all the time.

## Features

- The project consists of a login oage (credentials are hardcoded for demo purposes)
- Login info is persisted in browser's local storage.
- A tasks page where a user can add tasks.
- Each task has an edit button where the user can edit it.
- If not logged in the user cannot access the tasks page.

## Project structure

The project follows clean architecture, and ensures each of the layers is separate from the other while communicating.

- The presentation layer holds templates to different pages.
- The model layer holds the actual data models and classes needed for this project.
- The logic layer holds all business logic for the project used to handle page specific logic.
- A Utils directory is added as well, it holds constant, middlewares and different functions that can be shared among different components.

## Installation

Clone the repo from the github site.
To install and run the project run the following commands:

```bash
  npm install
  npm run dev
```

Then navigate to the url indicated in the terminal.

## Authors

- [Bechara Murr](bechara.murr@outlook.com)

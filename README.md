# Bolttech ToDo
This challenge involves the creation of a multi-user task manager web application.

### Intro 
The application should include the following features:
-  User Registration
-  User Authentication (login/logout)
-  Visualize, add, edit and remove user projects
-  Visualize, add, edit and remove tasks associated with the projects


### Requirements:
- One user may have several projects
- One user can access his projects only
- Each project may include multiple tasks
- Each task must have a description, creation date and finish date
- The user needs to have a simple option to mark the tasks as completed when accessing the task list
- Each task should have its termination date visible as a tooltip, if available, and some visual way of identifying
its status
- A task that was defined as finished should not be edited nor removed
- When a task or Project is added our deleted, the page should not fully refresh, so that users have a good
experience
### Non funcional requirements
- The application should be written in Javascript.
- The application backend should be written in Node.js or GoLang.
- The authentication and registration layers should be coded and not based on pre-existing modules (such as
Passport).
- For the frontend, javascript frameworks can be used (Angular, React, Polymer or others).
- Components should be used to promote increased code reusage (react or angular components,
webcomponents or other alternatives)
### Extras:
- Build tools (e.g. grunt or gulp)
- Unit tests

## Install
```code
  yarn install
```

## Run Api
```code
  yarn start api
```
- [http://localhost:3000/](http://localhost:3000/)

## Run Web
```code
  yarn start web
```
- [http://localhost:4200/](http://localhost:4200/)

## Author

- [@jonasribeiroc](https://www.github.com/jonasribeiroc)
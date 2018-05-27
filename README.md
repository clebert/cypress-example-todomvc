# cypress-example-todomvc

[![Build Status][badge-travis-image]][badge-travis-link]
[![TypeScript][badge-typescript-image]][badge-typescript-link]

> A [new implementation](https://github.com/clebert/cypress-example-todomvc/blob/master/cypress/integration/todomvc.spec.ts) of the [official TodoMVC tests](https://github.com/tastejs/todomvc/blob/master/tests/test.js) written with [Cypress](https://www.cypress.io/) using the [Page Object design pattern](https://martinfowler.com/bliki/PageObject.html).

Another implementation written with Cypress **but without** using the Page Object design pattern can be found [here](https://github.com/cypress-io/cypress-example-todomvc).

## Getting started

### Installing the dependencies

```sh
yarn
```

### Starting the test runner

```sh
yarn start
```

### Showing the recorded CI tests

You can find the dashboard [here](https://dashboard.cypress.io/#/projects/5w61vf/runs).

## Implemented tests (TodoMVC - React)

### When page is initially opened

- [x] it should focus on the todo input field

### No Todos

- [x] it should hide #main and #footer

### New Todo

- [x] it should allow me to add todo items
- [x] it should clear text input field when an item is added
- [x] it should append new items to the bottom of the list
- [x] it should trim text input
- [x] it should show #main and #footer when items added

### Mark all as completed

- [x] it should allow me to mark all items as completed
- [x] it should allow me to clear the complete state of all items
- [x] it complete all checkbox should update state when items are completed / cleared

### Item

- [ ] it should allow me to mark items as complete
- [ ] it should allow me to un-mark items as complete
- [ ] it should allow me to edit an item

### Editing

- [ ] it should hide other controls when editing
- [ ] it should save edits on blur
- [ ] it should trim entered text
- [ ] it should remove the item if an empty text string was entered
- [ ] it should cancel edits on escape

### Counter

- [ ] it should display the current number of todo items

### Clear completed button

- [ ] it should display the correct text
- [ ] it should remove completed items when clicked
- [ ] it should be hidden when there are no items that are completed

### Persistence

- [ ] it should persist its data

### Routing

- [ ] it should allow me to display active items
- [ ] it should respect the back button
- [ ] it should allow me to display completed items
- [ ] it should allow me to display all items
- [ ] it should highlight the currently applied filter

---

Copyright (c) 2018-present, Clemens Akens. Released under the terms of the [MIT License](https://github.com/clebert/cypress-example-todomvc/blob/master/LICENSE).

[badge-travis-image]: https://travis-ci.org/clebert/cypress-example-todomvc.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cypress-example-todomvc
[badge-typescript-image]: https://img.shields.io/badge/TypeScript-ready-blue.svg
[badge-typescript-link]: https://www.typescriptlang.org/

import {Footer} from '../components/Footer';
import {MainSection} from '../components/MainSection';
import {TodoCount} from '../components/TodoCount';
import {TodoInput} from '../components/TodoInput';
import {TodoItem} from '../components/TodoItem';
import {ToggleAll} from '../components/ToggleAll';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';
const TODO_ITEM_THREE = 'book a doctors appointment';

describe('TodoMVC - React', () => {
  beforeEach(() => {
    // We've set our baseUrl to be http://todomvc.com/examples/react/#
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit

    cy.visit('/');
  });

  context('When page is initially opened', () => {
    it('should focus on the todo input field', () => {
      new TodoInput().shouldBeFocused();
    });
  });

  context('No Todos', () => {
    it('should hide #main and #footer', () => {
      new TodoItem().shouldNotExist();
      new MainSection().shouldNotExist();
      new Footer().shouldNotExist();
    });
  });

  context('New Todo', () => {
    it('should allow me to add todo items', () => {
      new TodoInput().type(TODO_ITEM_ONE).type('{enter}');

      new TodoItem().nth(1).shouldHaveText(TODO_ITEM_ONE);

      new TodoInput().type(TODO_ITEM_TWO).type('{enter}');

      new TodoItem().nth(2).shouldHaveText(TODO_ITEM_TWO);
    });

    it('should clear text input field when an item is added', () => {
      new TodoInput()
        .type(TODO_ITEM_ONE)
        .shouldHaveValue(TODO_ITEM_ONE)
        .type('{enter}')
        .shouldHaveValue('');
    });

    it('should append new items to the bottom of the list', () => {
      new TodoInput()
        .type(TODO_ITEM_ONE)
        .type('{enter}')
        .type(TODO_ITEM_TWO)
        .type('{enter}')
        .type(TODO_ITEM_THREE)
        .type('{enter}');

      new TodoCount().shouldHaveText('3 items left');

      new TodoItem().nth(1).shouldHaveText(TODO_ITEM_ONE);
      new TodoItem().nth(2).shouldHaveText(TODO_ITEM_TWO);
      new TodoItem().nth(3).shouldHaveText(TODO_ITEM_THREE);
    });

    it('should trim text input', () => {
      new TodoInput().type(`    ${TODO_ITEM_ONE}    `).type('{enter}');

      new TodoItem().nth(1).shouldHaveText(TODO_ITEM_ONE);
    });

    it('should show #main and #footer when items added', () => {
      new TodoInput().type(TODO_ITEM_ONE).type('{enter}');

      new MainSection().shouldExist();
      new Footer().shouldExist();
    });
  });

  context('Mark all as completed', () => {
    beforeEach(() => {
      new TodoInput()
        .type(TODO_ITEM_ONE)
        .type('{enter}')
        .type(TODO_ITEM_TWO)
        .type('{enter}')
        .type(TODO_ITEM_THREE)
        .type('{enter}');
    });

    it('should allow me to mark all items as completed', () => {
      const todo1 = new TodoItem().nth(1).shouldBeActive();
      const todo2 = new TodoItem().nth(2).shouldBeActive();
      const todo3 = new TodoItem().nth(3).shouldBeActive();

      new ToggleAll().click();

      todo1.shouldBeCompleted();
      todo2.shouldBeCompleted();
      todo3.shouldBeCompleted();
    });

    it('should allow me to clear the complete state of all items', () => {
      new ToggleAll().click().click();

      new TodoItem().nth(1).shouldBeActive();
      new TodoItem().nth(2).shouldBeActive();
      new TodoItem().nth(3).shouldBeActive();
    });

    it('complete all checkbox should update state when items are completed / cleared', () => {
      const toggleAll = new ToggleAll().click().shouldBeChecked();

      const todo1 = new TodoItem().nth(1).toggle();

      toggleAll.shouldNotBeChecked();

      todo1.toggle();

      toggleAll.shouldBeChecked();
    });
  });
});

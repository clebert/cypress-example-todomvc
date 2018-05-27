import {Footer} from '../components/Footer';
import {MainSection} from '../components/MainSection';
import {TodoCount} from '../components/TodoCount';
import {TodoInput} from '../components/TodoInput';
import {TodoItem} from '../components/TodoItem';
import {ToggleAll} from '../components/ToggleAll';

describe('TodoMVC - React', () => {
  const TODO_ITEM_ONE = 'buy some cheese';
  const TODO_ITEM_TWO = 'feed the cat';
  const TODO_ITEM_THREE = 'book a doctors appointment';

  const footer = new Footer();
  const mainSection = new MainSection();
  const todoCount = new TodoCount();
  const todoInput = new TodoInput();
  const todoItem = new TodoItem();
  const todoItem1 = todoItem.nth(1);
  const todoItem2 = todoItem.nth(2);
  const todoItem3 = todoItem.nth(3);
  const toggleAll = new ToggleAll();

  beforeEach(() => {
    // We've set our baseUrl to be http://todomvc.com/examples/react/#
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit

    cy.visit('/');
  });

  context('When page is initially opened', () => {
    it('should focus on the todo input field', () => {
      todoInput.should.beFocused();
    });
  });

  context('No Todos', () => {
    it('should hide #main and #footer', () => {
      todoItem.shouldNot.exist();
      mainSection.shouldNot.exist();
      footer.shouldNot.exist();
    });
  });

  context('New Todo', () => {
    it('should allow me to add todo items', () => {
      todoInput.type(TODO_ITEM_ONE).type('{enter}');

      todoItem1.should.haveText(TODO_ITEM_ONE);

      todoInput.type(TODO_ITEM_TWO).type('{enter}');

      todoItem2.should.haveText(TODO_ITEM_TWO);
    });

    it('should clear text input field when an item is added', () => {
      todoInput.type(TODO_ITEM_ONE).should.haveValue(TODO_ITEM_ONE);
      todoInput.type('{enter}').should.haveValue('');
    });

    it('should append new items to the bottom of the list', () => {
      todoInput
        .type(TODO_ITEM_ONE)
        .type('{enter}')
        .type(TODO_ITEM_TWO)
        .type('{enter}')
        .type(TODO_ITEM_THREE)
        .type('{enter}');

      todoCount.should.haveText('3 items left');

      todoItem1.should.haveText(TODO_ITEM_ONE);
      todoItem2.should.haveText(TODO_ITEM_TWO);
      todoItem3.should.haveText(TODO_ITEM_THREE);
    });

    it('should trim text input', () => {
      todoInput.type(`    ${TODO_ITEM_ONE}    `).type('{enter}');

      todoItem1.should.haveText(TODO_ITEM_ONE);
    });

    it('should show #main and #footer when items added', () => {
      todoInput.type(TODO_ITEM_ONE).type('{enter}');

      mainSection.should.exist();
      footer.should.exist();
    });
  });

  context('Mark all as completed', () => {
    beforeEach(() => {
      todoInput
        .type(TODO_ITEM_ONE)
        .type('{enter}')
        .type(TODO_ITEM_TWO)
        .type('{enter}')
        .type(TODO_ITEM_THREE)
        .type('{enter}');
    });

    it('should allow me to mark all items as completed', () => {
      todoItem1.shouldNot.beCompleted();
      todoItem2.shouldNot.beCompleted();
      todoItem3.shouldNot.beCompleted();

      toggleAll.click();

      todoItem1.should.beCompleted();
      todoItem2.should.beCompleted();
      todoItem3.should.beCompleted();
    });

    it('should allow me to clear the complete state of all items', () => {
      toggleAll.click().click();

      todoItem1.shouldNot.beCompleted();
      todoItem2.shouldNot.beCompleted();
      todoItem3.shouldNot.beCompleted();
    });

    it('complete all checkbox should update state when items are completed / cleared', () => {
      toggleAll.click().should.beChecked();

      todoItem1.toggle();

      toggleAll.shouldNot.beChecked();

      todoItem1.toggle();

      toggleAll.should.beChecked();
    });
  });
});

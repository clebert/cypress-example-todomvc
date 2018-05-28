import {Footer} from '../components/Footer';
import {MainSection} from '../components/MainSection';
import {NewTodoInput} from '../components/NewTodoInput';
import {TodoCount} from '../components/TodoCount';
import {TodoItem} from '../components/TodoItem';
import {ToggleAll} from '../components/ToggleAll';

describe('TodoMVC - React', () => {
  const TODO_ITEM_ONE = 'buy some cheese';
  const TODO_ITEM_TWO = 'feed the cat';
  const TODO_ITEM_THREE = 'book a doctors appointment';

  const footer = new Footer();
  const mainSection = new MainSection();
  const newTodoInput = new NewTodoInput();
  const todoCount = new TodoCount();
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
      newTodoInput.should.beFocused();
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
      newTodoInput.type(TODO_ITEM_ONE).type('{enter}');

      todoItem1.should.haveText(TODO_ITEM_ONE);

      newTodoInput.type(TODO_ITEM_TWO).type('{enter}');

      todoItem2.should.haveText(TODO_ITEM_TWO);
    });

    it('should clear text input field when an item is added', () => {
      newTodoInput.type(TODO_ITEM_ONE).should.haveValue(TODO_ITEM_ONE);
      newTodoInput.type('{enter}').should.haveValue('');
    });

    it('should append new items to the bottom of the list', () => {
      newTodoInput
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
      newTodoInput.type(`    ${TODO_ITEM_ONE}    `).type('{enter}');

      todoItem1.should.haveText(TODO_ITEM_ONE);
    });

    it('should show #main and #footer when items added', () => {
      newTodoInput.type(TODO_ITEM_ONE).type('{enter}');

      mainSection.should.exist();
      footer.should.exist();
    });
  });

  context('Mark all as completed', () => {
    beforeEach(() => {
      newTodoInput
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

  context('Item', () => {
    it('should allow me to mark items as complete', () => {
      newTodoInput.type(TODO_ITEM_ONE).type('{enter}');
      newTodoInput.type(TODO_ITEM_TWO).type('{enter}');

      todoItem1.toggle().should.beCompleted();

      todoItem2.shouldNot.beCompleted();

      todoItem2.toggle().should.beCompleted();

      todoItem1.should.beCompleted();
    });

    it('should allow me to un-mark items as complete', () => {
      newTodoInput.type(TODO_ITEM_ONE).type('{enter}');
      newTodoInput.type(TODO_ITEM_TWO).type('{enter}');

      todoItem1.toggle().should.beCompleted();

      todoItem2.shouldNot.beCompleted();

      todoItem1.toggle().shouldNot.beCompleted();

      todoItem2.shouldNot.beCompleted();
    });

    it('should allow me to edit an item', () => {
      newTodoInput
        .type(TODO_ITEM_ONE)
        .type('{enter}')
        .type(TODO_ITEM_TWO)
        .type('{enter}')
        .type(TODO_ITEM_THREE)
        .type('{enter}');

      todoItem2.edit();

      todoItem2
        .findEditTodoInput()
        .clear()
        .type('buy some sausages')
        .type('{enter}');

      todoItem1.should.haveText(TODO_ITEM_ONE);
      todoItem2.should.haveText('buy some sausages');
      todoItem3.should.haveText(TODO_ITEM_THREE);
    });
  });
});

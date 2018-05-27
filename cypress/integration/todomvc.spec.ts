import {Footer} from '../components/Footer';
import {MainSection} from '../components/MainSection';
import {TodoCount} from '../components/TodoCount';
import {TodoInput} from '../components/TodoInput';
import {TodoItem} from '../components/TodoItem';

const TODO_ITEM_ONE = 'buy some cheese';
const TODO_ITEM_TWO = 'feed the cat';
const TODO_ITEM_THREE = 'book a doctors appointment';

describe('TodoMVC - React', () => {
  beforeEach(() => {
    cy.visit('http://todomvc.com/examples/react/#/');
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

      new TodoItem(TodoItem.nth(1)).shouldHaveText(TODO_ITEM_ONE);

      new TodoInput().type(TODO_ITEM_TWO).type('{enter}');

      new TodoItem(TodoItem.nth(2)).shouldHaveText(TODO_ITEM_TWO);
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

      new TodoItem(TodoItem.nth(1)).shouldHaveText(TODO_ITEM_ONE);
      new TodoItem(TodoItem.nth(2)).shouldHaveText(TODO_ITEM_TWO);
      new TodoItem(TodoItem.nth(3)).shouldHaveText(TODO_ITEM_THREE);
    });

    it('should trim text input', () => {
      new TodoInput().type(`    ${TODO_ITEM_ONE}    `).type('{enter}');

      new TodoItem(TodoItem.nth(1)).shouldHaveText(TODO_ITEM_ONE);
    });

    it('should show #main and #footer when items added', () => {
      new TodoInput().type(TODO_ITEM_ONE).type('{enter}');

      new MainSection().shouldExist();
      new Footer().shouldExist();
    });
  });
});

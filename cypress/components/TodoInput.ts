import {Component} from './Component';

export class TodoInput extends Component {
  public readonly selector: string = '.new-todo';

  public type(text: string): this {
    this.element.type(text);

    return this;
  }

  public shouldBeFocused(): this {
    cy.focused().should('have.class', 'new-todo');

    return this;
  }

  public shouldHaveValue(text: string): this {
    this.element.should('have.value', text);

    return this;
  }
}

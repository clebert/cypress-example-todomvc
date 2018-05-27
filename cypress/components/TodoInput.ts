import {Component, Props} from './Component';

export class TodoInputProps extends Props {
  public beFocused(): void {
    cy.focused().should(`${this.not}have.class`, 'new-todo');
  }

  public haveValue(text: string): void {
    this.element.should(`${this.not}have.value`, text);
  }
}

export class TodoInput extends Component<TodoInputProps> {
  protected readonly Props = TodoInputProps;
  protected readonly selector: string = '.new-todo';

  public type(text: string): this {
    this.element.type(text);

    return this;
  }
}

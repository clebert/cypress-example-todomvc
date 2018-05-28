import {Component, Props} from './Component';

export class NewTodoInputProps extends Props {
  public beFocused(): void {
    cy.focused().should(`${this.not}have.class`, 'new-todo');
  }

  public haveValue(text: string): void {
    this.element.should(`${this.not}have.value`, text);
  }
}

export class NewTodoInput extends Component<NewTodoInputProps> {
  protected readonly Props = NewTodoInputProps;
  protected readonly selector: string = '.new-todo';

  public type(text: string): this {
    this.element.type(text);

    return this;
  }
}

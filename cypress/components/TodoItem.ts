import {Component, Props} from './Component';
import {EditTodoInput} from './EditTodoInput';

export class TodoItemProps extends Props {
  public beCompleted(): void {
    this.element.should(`${this.not}have.class`, 'completed');
  }

  public haveText(text: string): void {
    this.element.find('label').should(`${this.not}have.text`, text);
  }
}

export class TodoItem extends Component<TodoItemProps> {
  protected readonly Props = TodoItemProps;
  protected readonly selector: string = '.todo-list li';

  public findEditTodoInput(): EditTodoInput {
    return new EditTodoInput(undefined, () => this.element);
  }

  public edit(): this {
    this.element.find('label').dblclick();

    return this;
  }

  public toggle(): this {
    this.element.find('.toggle').click();

    return this;
  }
}

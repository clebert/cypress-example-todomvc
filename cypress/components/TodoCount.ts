import {Component, Props} from './Component';

export class TodoCountProps extends Props {
  public haveText(text: string): void {
    this.element.should(`${this.not}have.text`, text);
  }
}

export class TodoCount extends Component<TodoCountProps> {
  protected readonly Props = TodoCountProps;
  protected readonly selector: string = '.todo-count';
}

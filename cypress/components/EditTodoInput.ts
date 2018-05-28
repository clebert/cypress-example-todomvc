import {Component, Props} from './Component';

export class EditTodoInput extends Component<Props> {
  protected readonly Props = Props;
  protected readonly selector: string = '.edit';

  public clear(): this {
    this.element.clear();

    return this;
  }

  public type(text: string): this {
    this.element.type(text);

    return this;
  }
}

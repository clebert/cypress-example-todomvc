import {Component} from './Component';

export class TodoCount extends Component {
  public readonly selector: string = '.todo-count';

  public shouldHaveText(text: string): this {
    this.element.should('have.text', text);

    return this;
  }
}

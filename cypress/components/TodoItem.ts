import {Component} from './Component';

export class TodoItem extends Component {
  public readonly selector: string = '.todo-list li';

  public shouldHaveText(text: string): this {
    this.element.find('label').should('have.text', text);

    return this;
  }
}

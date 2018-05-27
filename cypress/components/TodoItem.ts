import {Component} from './Component';

export class TodoItem extends Component {
  public readonly selector: string = '.todo-list li';

  public toggle(): this {
    this.element.find('.toggle').click();

    return this;
  }

  public shouldBeCompleted(): this {
    this.element.should('have.class', 'completed');

    return this;
  }

  public shouldBeActive(): this {
    this.element.should('not.have.class', 'completed');

    return this;
  }

  public shouldHaveText(text: string): this {
    this.element.find('label').should('have.text', text);

    return this;
  }
}

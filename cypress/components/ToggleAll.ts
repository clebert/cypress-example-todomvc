import {Component} from './Component';

export class ToggleAll extends Component {
  public readonly selector: string = '.toggle-all';

  public click(): this {
    this.element.click();

    return this;
  }

  public shouldBeChecked(): this {
    this.element.should('be.checked');

    return this;
  }

  public shouldNotBeChecked(): this {
    this.element.should('not.be.checked');

    return this;
  }
}

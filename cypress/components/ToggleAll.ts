import {Component, Props} from './Component';

export class ToggleAllProps extends Props {
  public beChecked(): void {
    this.element.should(`${this.not}be.checked`);
  }
}

export class ToggleAll extends Component<ToggleAllProps> {
  protected readonly Props = ToggleAllProps;
  protected readonly selector: string = '.toggle-all';

  public click(): this {
    this.element.click();

    return this;
  }
}

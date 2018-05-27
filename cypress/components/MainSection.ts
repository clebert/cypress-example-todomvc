import {Component, Props} from './Component';

export class MainSection extends Component<Props> {
  protected readonly Props = Props;
  protected readonly selector: string = '.main';
}

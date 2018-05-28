export type ElementQuery = () => Cypress.Chainable<JQuery>;

export class Props {
  protected readonly not: string;

  private readonly _query: ElementQuery;

  public constructor(query: ElementQuery, negated: boolean) {
    this.not = negated ? 'not.' : '';
    this._query = query;
  }

  protected get element(): Cypress.Chainable<JQuery> {
    return this._query();
  }

  public exist(): void {
    this.element.should(`${this.not}exist`);
  }

  public beHidden(): void {
    this.element.should(`${this.not}be.hidden`);
  }

  public beVisible(): void {
    this.element.should(`${this.not}be.visible`);
  }
}

export interface PropsClass<TProps extends Props> {
  new (query: () => Cypress.Chainable<JQuery>, negated: boolean): TProps;
}

export type ComponentLocator = (
  element: Cypress.Chainable<JQuery>
) => Cypress.Chainable<JQuery>;

export abstract class Component<TProps extends Props> {
  protected abstract readonly Props: PropsClass<TProps>;
  protected abstract readonly selector: string;

  private readonly _locator?: ComponentLocator;
  private readonly _parentQuery?: ElementQuery;

  public constructor(locator?: ComponentLocator, parentQuery?: ElementQuery) {
    this._locator = locator;
    this._parentQuery = parentQuery;
  }

  public get should(): TProps {
    return new this.Props(() => this.element, false);
  }

  public get shouldNot(): TProps {
    return new this.Props(() => this.element, true);
  }

  protected get element(): Cypress.Chainable<JQuery> {
    const parentElement = this._parentQuery
      ? this._parentQuery()
      : cy.get(':root');

    const element = parentElement.find(this.selector);

    return this._locator ? this._locator(element) : element;
  }

  public nth(position: number): this {
    const locator = () => this.element.eq(position - 1);

    // tslint:disable-next-line no-any
    return new (this.constructor as any)(locator, this._parentQuery);
  }
}

export type ComponentLocator = (
  element: Cypress.Chainable<JQuery>
) => Cypress.Chainable<JQuery>;

export abstract class Component {
  protected abstract readonly selector: string;

  private readonly _locator?: ComponentLocator;
  private readonly _parentElement?: Cypress.Chainable<JQuery>;

  public constructor(
    locator?: ComponentLocator,
    parentElement?: Cypress.Chainable<JQuery>
  ) {
    this._locator = locator;
    this._parentElement = parentElement;
  }

  protected get element(): Cypress.Chainable<JQuery> {
    const element = (this._parentElement || cy.get(':root')).find(
      this.selector
    );

    return this._locator ? this._locator(element) : element;
  }

  public nth(position: number): this {
    const locator = () => this.element.eq(position - 1);

    // tslint:disable-next-line no-any
    return new (this.constructor as any)(locator, this._parentElement);
  }

  public shouldExist(): this {
    this.element.should('exist');

    return this;
  }

  public shouldNotExist(): this {
    this.element.should('not.exist');

    return this;
  }

  public shouldBeHidden(): this {
    this.element.should('be.hidden');

    return this;
  }

  public shouldBeVisible(): this {
    this.element.should('be.visible');

    return this;
  }
}

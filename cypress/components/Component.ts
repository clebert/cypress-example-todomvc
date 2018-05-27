export type ComponentLocator = (
  element: Cypress.Chainable<JQuery>
) => Cypress.Chainable<JQuery>;

export abstract class Component {
  public static nth(position: number): ComponentLocator {
    return element => element.eq(position - 1);
  }

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

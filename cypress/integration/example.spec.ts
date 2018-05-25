describe('Example', () => {
  it('should assert that <title> is correct', () => {
    cy.visit('http://example.com/');

    cy.title().should('equal', 'Example Domain');
  });
});

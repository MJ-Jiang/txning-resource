describe("smoke", () => {
  it("open homepage", () => {
    cy.visit("/");
    cy.title().should("not.be.empty");
  });
});

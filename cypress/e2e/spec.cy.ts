describe("Login", () => {
  let userData: { username: string; password: string };
  before(() => {
    cy.fixture("demouserdata").then((fixture) => {
      userData = fixture;
    });
  });
  it("Performs authentication flow", () => {
    cy.visit("/login");
    cy.findByLabelText(/Username/i, { timeout: 7000 }).should("exist");
    cy.findByLabelText(/Password/i, { timeout: 7000 }).should("exist");

    cy.findByLabelText(/Username/i, { timeout: 7000 }).type(userData.username);
    cy.findByLabelText(/Password/i, { timeout: 7000 }).type(userData.password);

    cy.findByText(/Login/i, { timeout: 7000 }).click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});


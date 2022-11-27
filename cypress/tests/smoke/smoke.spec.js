describe("Smoke test smartnews-visu-front", () => {
  it("Smoke test", () => {
    cy.login("Centrale", "Centrale Nationale", "recusr01", "superu")
    cy.irisAvatarHasInitials()

    // TODO implementer un test validant que les APIs du projet retournent des valeurs
    cy.get("#SMOKE_TEST_VALIDER_APIS")

    cy.logout()
  })
})

describe('test slider', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should pass', () => {
    cy.get('button[data-cy="buttonRight"]').click()
  })
  it('should pass next', () => {
    cy.get('button[data-cy="buttonRight"]').click()
    cy.get('button[data-cy="buttonRight"]').should('exist')
    cy.get('button[data-cy="buttonRight"]').click()

    cy.contains('button[data-cy="buttonRight"]').should('not.exist')
  })

  it('should pass prev', () => {
    cy.get('button[data-cy="buttonRight"]').click()
    cy.get('button[data-cy="buttonLeft"]').should('exist')
    cy.get('button[data-cy="buttonLeft"]').click()

    cy.contains('button[data-cy="buttonLeft"]').should('not.exist')
  })

  it('should show product info', () => {
    cy.get('a[data-cy="link-product"]').first().realHover()
    cy.contains('Camiseta Igniter Aboard').should('be.visible')
  })
})

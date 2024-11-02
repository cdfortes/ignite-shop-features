describe('test data in the cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('open cart', () => {
    cy.get('div[data-state="closed"]').should('exist')
    cy.get('button[data-cy="button-cart"]').click()
    cy.get('div[data-state="open"]').should('exist')
    cy.contains('Sacola de compras').should('be.visible')
  })

  it('close cart', () => {
    cy.get('button[data-cy="button-cart"]').click()
    cy.get('div[data-state="open"]').should('exist')
    cy.get('button[data-cy="button-close-cart"]').click()
    cy.get('div[data-state="closed"]').should('exist')
  })

  it('empty cart', () => {
    cy.get('button[data-cy="button-cart"]').click()
    cy.contains('A sacola de compras está vazia').should('be.visible')
  })

  it('Delete item', () => {
    cy.get('a[href="/product/prod_OUKHAdVIMrajyX"]').click()

    cy.contains('Colocar na sacola').click()

    cy.get('button[data-cy="button-cart"]').click()

    cy.get('button[data-cy="button-item-cart"]').first().click()

    cy.contains('span[data-cy="quantity-items"]').should('not.exist')
  })
})

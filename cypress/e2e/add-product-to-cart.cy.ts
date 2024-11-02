describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href="/product/prod_OUKHAdVIMrajyX"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKHAdVIMrajyX')
    cy.contains('Colocar na sacola').click()

    cy.contains('span', '1').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('a[href="/product/prod_OUKHAdVIMrajyX"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKHAdVIMrajyX')
    cy.contains('Colocar na sacola').click()
    cy.contains('Colocar na sacola').click()

    cy.contains('span', '1').should('exist')
  })

  it('add 2 products to cart', () => {
    cy.get('a[href="/product/prod_OUKHAdVIMrajyX"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKHAdVIMrajyX')
    cy.contains('Colocar na sacola').click()
    cy.contains('span', '1').should('exist')

    cy.visit('/')
    cy.get('a[href="/product/prod_OUKGG73jKrSQQE"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKGG73jKrSQQE')
    cy.contains('Colocar na sacola').click()

    cy.contains('span', '2').should('exist')
  })

  it('add 3 products to cart', () => {
    cy.get('a[href="/product/prod_OUKHAdVIMrajyX"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKHAdVIMrajyX')
    cy.contains('Colocar na sacola').click()
    cy.contains('span', '1').should('exist')

    cy.visit('/')
    cy.get('a[href="/product/prod_OUKGG73jKrSQQE"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKGG73jKrSQQE')
    cy.contains('Colocar na sacola').click()
    cy.contains('span', '2').should('exist')

    cy.visit('/')
    cy.get('button[data-cy="buttonRight"]').click()
    cy.get('button[data-cy="buttonRight"]').click()
    cy.get('a[href="/product/prod_OUKEnMxITdRyVy"]').click()

    cy.location('pathname').should('include', '/product/prod_OUKEnMxITdRyVy')
    cy.contains('Colocar na sacola').click()
    cy.contains('span', '3').should('exist')
  })
})

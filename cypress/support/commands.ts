import {
  SELECTORS,
  TEST_INGREDIENTS,
  API_ENDPOINTS,
  TEST_USER,
  TEST_TOKENS
} from './constants';

Cypress.Commands.add('addIngredient', (ingredientId: string) => {
  cy.get(SELECTORS.ingredientButton(ingredientId)).click();
});

Cypress.Commands.add('addBun', () => cy.addIngredient(TEST_INGREDIENTS.bun));
Cypress.Commands.add('addMain', () => cy.addIngredient(TEST_INGREDIENTS.main));
Cypress.Commands.add('addSauce', () => cy.addIngredient(TEST_INGREDIENTS.sauce));

Cypress.Commands.add('buildBurger', () => {
  cy.addBun();
  cy.addMain();
  cy.addSauce();
});

Cypress.Commands.add(
  'login',
  (email: string = TEST_USER.email, password: string = TEST_USER.password) => {
    cy.intercept('POST', API_ENDPOINTS.login).as('login');

    cy.visit('/login');
    cy.get(SELECTORS.emailInput).type(email);
    cy.get(SELECTORS.passwordInput).type(password);
    cy.get(SELECTORS.submitButton).click();

    cy.wait('@login');

    cy.window().then(win => {
      expect(win.localStorage.getItem('refreshToken')).to.eq(
        TEST_TOKENS.refreshToken
      );
    });

    cy.getCookie('accessToken').should('have.property', 'value', TEST_TOKENS.accessToken);

    cy.url().should('include', '/');
  }
);

Cypress.Commands.add('openIngredientModal', (ingredientName: string) => {
  cy.contains(ingredientName).click();
  cy.get(SELECTORS.modal).should('be.visible').as('modal');
});

Cypress.Commands.add('closeModal', () => {
  cy.get(SELECTORS.modalClose).click();
  cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(SELECTORS.modalOverlay).click({ force: true });
  cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('setupConstructorIntercepts', () => {
  cy.intercept('GET', API_ENDPOINTS.ingredients, {
    fixture: 'ingredients.json'
  }).as('getIngredients');
});

Cypress.Commands.add('setupOrderIntercepts', () => {
  cy.setupConstructorIntercepts();
  cy.intercept('POST', API_ENDPOINTS.login, { fixture: 'login.json' }).as('login');
  cy.intercept('POST', API_ENDPOINTS.orders, { fixture: 'order.json' }).as('postOrder');
});

Cypress.Commands.add('verifyConstructorEmpty', () => {
  cy.get(SELECTORS.constructorBunTop).should('not.exist');
  cy.get(SELECTORS.constructorBunBottom).should('not.exist');
});

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(ingredientId: string): Chainable<void>;
      addBun(): Chainable<void>;
      addMain(): Chainable<void>;
      addSauce(): Chainable<void>;
      buildBurger(): Chainable<void>;

      login(email?: string, password?: string): Chainable<void>;

      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;

      setupConstructorIntercepts(): Chainable<void>;
      setupOrderIntercepts(): Chainable<void>;

      verifyConstructorEmpty(): Chainable<void>;
    }
  }
}

export {};

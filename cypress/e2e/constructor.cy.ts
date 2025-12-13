import {
  SELECTORS,
  TEST_INGREDIENTS,
  TEST_INGREDIENT_NAMES,
  PLACEHOLDERS
} from '../support/constants';

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.setupConstructorIntercepts();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should show ingredients from mock data', () => {
    cy.contains(TEST_INGREDIENT_NAMES.bun).should('exist');
    cy.contains(TEST_INGREDIENT_NAMES.main).should('exist');
    cy.contains(TEST_INGREDIENT_NAMES.sauce).should('exist');
  });

  describe('Adding ingredients to constructor', () => {
    it('should add bun to top and bottom positions', () => {
      cy.addBun();

      cy.get(SELECTORS.constructorBunTop)
        .as('topBun')
        .contains(TEST_INGREDIENT_NAMES.bun)
        .should('exist');

      cy.get(SELECTORS.constructorBunBottom)
        .as('bottomBun')
        .contains(TEST_INGREDIENT_NAMES.bun)
        .should('exist');
    });

    it('should add main ingredient to constructor', () => {
      cy.addMain();

      cy.get(SELECTORS.constructorIngredients)
        .as('ingredients')
        .contains(TEST_INGREDIENT_NAMES.main)
        .should('exist');
    });

    it('should add sauce to constructor', () => {
      cy.addSauce();

      cy.get(SELECTORS.constructorIngredients)
        .as('ingredients')
        .contains(TEST_INGREDIENT_NAMES.sauce)
        .should('exist');
    });
  });

  describe('Ingredient modal', () => {
    it('should open modal with correct ingredient data', () => {
      cy.openIngredientModal(TEST_INGREDIENT_NAMES.bun);

      cy.get('@modal').contains(TEST_INGREDIENT_NAMES.bun).should('exist');
    });

    it('should close modal on close button click', () => {
      cy.openIngredientModal(TEST_INGREDIENT_NAMES.bun);
      cy.closeModal();
    });

    it('should close modal on overlay click', () => {
      cy.openIngredientModal(TEST_INGREDIENT_NAMES.bun);
      cy.closeModalByOverlay();
    });
  });
});

describe('Order Creation', () => {
  beforeEach(() => {
    cy.setupOrderIntercepts();
    cy.login();
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should create order successfully', () => {
    cy.buildBurger();

    cy.get(SELECTORS.orderButton).click();

    cy.wait('@postOrder').its('request.body').should('deep.equal', {
      ingredients: [
        TEST_INGREDIENTS.bun,
        TEST_INGREDIENTS.main,
        TEST_INGREDIENTS.sauce,
        TEST_INGREDIENTS.bun
      ]
    });

    cy.get(SELECTORS.modal).as('orderModal').should('be.visible');
    cy.get('@orderModal').contains('12345').should('exist');

    cy.closeModal();

    cy.verifyConstructorEmpty();

    cy.get(SELECTORS.constructorIngredients)
      .as('ingredients')
      .should('not.contain', TEST_INGREDIENT_NAMES.main)
      .and('not.contain', TEST_INGREDIENT_NAMES.sauce);

    cy.get('@ingredients')
      .contains(PLACEHOLDERS.emptyIngredients)
      .should('exist');
  });
});

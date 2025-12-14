const bunIngredients = '[data-cy="bun-ingredients"]';
const bunIngredientsLi = `${bunIngredients} li`;
const constructorBunFirst = '[data-cy="constructor-bun-1"]';
const constructorBunSecond = '[data-cy="constructor-bun-2"]';
const modal = '#modals [data-cy="modal"]';
const modalOverlay = '#modals [data-cy="modal-overlay"]';
const constructorIngredient = '[data-cy="constructor-ingredient"]';
const mainsIngredients = '[data-cy="mains-ingredients"]';
const modalCloseButton = '#modals [data-cy="modal-close-button"]';
const orderButton = '[data-cy="order-button"] button';

describe('Burger Constructor Tests', function () {
  beforeEach(function () {
    cy.intercept('GET', '**/api/ingredients**', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user**', {
      statusCode: 200,
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders**', {
      statusCode: 200,
      fixture: 'order.json'
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'fake-access-token');
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    cy.setCookie('accessToken', 'Bearer fake-access-token');

    cy.viewport(1300, 800);
    cy.visit('/');

    cy.wait('@getIngredients');
  });

  afterEach(function () {
    cy.window().then((win) => {
      win.localStorage.removeItem('accessToken');
      win.localStorage.removeItem('refreshToken');
    });
    cy.clearCookies();
  });

  describe('add ingredients to constructor works correctly', function () {
    it('should add bun', function () {
      cy.get(bunIngredients).contains('Добавить').click();
      cy.get(constructorBunFirst)
        .contains('Краторная булка N-200i')
        .should('exist');
      cy.get(constructorBunSecond)
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('should add ingredient', function () {
      cy.contains('Начинки').click();
      cy.get(mainsIngredients).contains('Добавить').click();
      cy.get(constructorIngredient)
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });
  });

  describe('modal windows functionality', function () {
    it('should open ingredient modal on click', function () {
      cy.get(bunIngredientsLi).first().click();
      cy.get(modal)
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');
    });

    it('should close modal by clicking close button', function () {
      cy.get(bunIngredientsLi).first().click();
      cy.get(modal).should('be.visible');
      cy.get(modalCloseButton).click();
      cy.get(modal).should('not.exist');
    });

    it('should close modal by clicking overlay', function () {
      cy.get(bunIngredientsLi).first().click();
      cy.get(modal).should('be.visible');
      cy.get(modalOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
    });

    it('should show correct ingredient data in modal', function () {
      cy.get(bunIngredientsLi).first().click();
      cy.get(modal)
        .should('contain', 'Краторная булка N-200i')
        .and('contain', '420')
        .and('contain', '80')
        .and('contain', '24')
        .and('contain', '53');
    });
  });

  describe('order creation process', function () {
    it('should create order and show modal with order number', function () {
      cy.get(bunIngredients).contains('Добавить').click();

      cy.contains('Начинки').click();
      cy.get(mainsIngredients).contains('Добавить').click();

      cy.wait(1000);

      cy.get(orderButton)
        .should('contain', 'Оформить заказ')
        .click();

      cy.wait('@createOrder', { timeout: 10000 });

      cy.get(modal, { timeout: 10000 })
        .should('be.visible')
        .and('contain', '12345');

      cy.get(modalCloseButton).click();
      cy.get(modal).should('not.exist');

      cy.get(constructorBunFirst).should('not.exist');
      cy.get(constructorIngredient).should('not.exist');
    });

    it('should NOT create order when no bun selected (click does nothing)', function () {
      cy.contains('Начинки').click();
      cy.get(mainsIngredients).contains('Добавить').click();

      cy.wait(500);

      cy.get(orderButton)
        .should('contain', 'Оформить заказ')
        .click();

      cy.get('@createOrder.all').should('have.length', 0);

      cy.get(modal).should('not.exist');

      cy.get(constructorIngredient).should('exist');
    });

    it('should NOT create order when constructor is empty (click does nothing)', function () {
      cy.get(orderButton)
        .should('contain', 'Оформить заказ')
        .click();

      cy.get('@createOrder.all').should('have.length', 0);

      cy.get(modal).should('not.exist');
    });
  });
});

export const SELECTORS = {
  ingredient: (id: string) => `[data-cy="ingredient-${id}"]`,
  ingredientButton: (id: string) => `[data-cy="ingredient-${id}"] button`,

  constructorBunTop: '[data-cy="constructor-bun-1"]',
  constructorBunBottom: '[data-cy="constructor-bun-2"]',
  constructorIngredients: '[data-cy="constructor-ingredients"]',
  orderButton: '[data-cy="order-button"]',

  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  modalOverlay: '[data-cy="modal-overlay"]',

  emailInput: 'input[name="email"]',
  passwordInput: 'input[name="password"]',
  submitButton: 'button[type="submit"]'
} as const;

export const TEST_INGREDIENTS = {
  bun: '643d69a5c3f7b9001cfa093c',
  main: '643d69a5c3f7b9001cfa0941',
  sauce: '643d69a5c3f7b9001cfa0942'
} as const;

export const TEST_INGREDIENT_NAMES = {
  bun: 'Краторная булка N-200i',
  main: 'Биокотлета из марсианской Магнолии',
  sauce: 'Соус Spicy-X'
} as const;

export const API_ENDPOINTS = {
  ingredients: 'api/ingredients',
  login: 'api/auth/login',
  orders: 'api/orders'
} as const;

export const TEST_USER = {
  email: 'test@test.com',
  password: 'password123'
} as const;

export const TEST_TOKENS = {
  refreshToken: 'test-refresh-token',
  accessToken: 'test-access-token'
} as const;

export const PLACEHOLDERS = {
  emptyIngredients: 'Выберите начинку',
  emptyBuns: 'Выберите булки'
} as const;

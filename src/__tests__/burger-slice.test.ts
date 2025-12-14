import {
  burgerReducer,
  addIngredient,
  removeIngredient,
  moveUp
} from '../services/burger-slice';
import { initialState } from '../services/burger-slice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 50,
  image: 'test.jpg',
  image_mobile: 'test-mobile.jpg',
  image_large: 'test-large.jpg'
};

const mockBunIngredient: TIngredient = {
  ...mockIngredient,
  _id: '2',
  name: 'Test Bun',
  type: 'bun'
};

const mockSauceIngredient: TIngredient = {
  ...mockIngredient,
  _id: '3',
  name: 'Test Sauce',
  type: 'sauce'
};

describe('burgerReducer', () => {
  it('должен добавить булку в конструктор', () => {
    const action = addIngredient(mockBunIngredient);
    const state = burgerReducer(initialState, action);

    expect(state.constructorBurger.bun).not.toBeNull();
    expect(state.constructorBurger.bun).toMatchObject({
      _id: mockBunIngredient._id,
      name: mockBunIngredient.name,
      type: 'bun'
    });
    expect(state.constructorBurger.bun).toHaveProperty('id');
    expect(state.constructorBurger.ingredients).toHaveLength(0);
  });

  it('должен добавить начинку в конструктор', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerReducer(initialState, action);

    expect(state.constructorBurger.ingredients).toHaveLength(1);
    expect(state.constructorBurger.ingredients[0]).toMatchObject({
      _id: mockIngredient._id,
      name: mockIngredient.name,
      type: 'main'
    });
    expect(state.constructorBurger.ingredients[0]).toHaveProperty('id');
    expect(state.constructorBurger.bun).toBeNull();
  });

  it('должен добавить соус в конструктор', () => {
    const action = addIngredient(mockSauceIngredient);
    const state = burgerReducer(initialState, action);

    expect(state.constructorBurger.ingredients).toHaveLength(1);
    expect(state.constructorBurger.ingredients[0]).toMatchObject({
      _id: mockSauceIngredient._id,
      name: mockSauceIngredient.name,
      type: 'sauce'
    });
    expect(state.constructorBurger.ingredients[0]).toHaveProperty('id');
  });

  it('должен добавить несколько начинок в конструктор', () => {
    const action1 = addIngredient(mockIngredient);
    const state1 = burgerReducer(initialState, action1);

    const action2 = addIngredient(mockSauceIngredient);
    const state2 = burgerReducer(state1, action2);

    expect(state2.constructorBurger.ingredients).toHaveLength(2);
    expect(state2.constructorBurger.ingredients[0].type).toBe('main');
    expect(state2.constructorBurger.ingredients[1].type).toBe('sauce');
  });

  it('должен удалить ингредиент по id', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorBurger: {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'id-1' },
          { ...mockSauceIngredient, id: 'id-2' },
          { ...mockIngredient, id: 'id-3' }
        ]
      }
    };

    const action = removeIngredient('id-2');
    const state = burgerReducer(stateWithIngredients, action);

    expect(state.constructorBurger.ingredients).toHaveLength(2);
    expect(
      state.constructorBurger.ingredients.find((item) => item.id === 'id-2')
    ).toBeUndefined();
    expect(state.constructorBurger.ingredients[0].id).toBe('id-1');
    expect(state.constructorBurger.ingredients[1].id).toBe('id-3');
  });

  it('должен переместить ингредиент вверх (moveUp)', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorBurger: {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'id-1', name: 'First' },
          { ...mockSauceIngredient, id: 'id-2', name: 'Second' },
          { ...mockIngredient, id: 'id-3', name: 'Third' }
        ]
      }
    };

    const action = moveUp(1);
    const state = burgerReducer(stateWithIngredients, action);

    expect(state.constructorBurger.ingredients).toHaveLength(3);
    expect(state.constructorBurger.ingredients[0].id).toBe('id-2');
    expect(state.constructorBurger.ingredients[1].id).toBe('id-1');
    expect(state.constructorBurger.ingredients[2].id).toBe('id-3');
  });
});

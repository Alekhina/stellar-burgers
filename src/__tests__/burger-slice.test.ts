import {
  burgerReducer,
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown
} from '../services/burger-slice';
import { TIngredient, TOrder } from '@utils-types';

describe('проверка burgerReducer', () => {
  const initialState = {
    constructorBurger: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

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

  const mockData: TOrder[] = [
    {
      _id: '1',
      ingredients: ['ingredient_1', 'ingredient_2'],
      status: 'done',
      name: 'test order',
      createdAt: '2025-12-12',
      updatedAt: '2025-12-12',
      number: 1
    }
  ];

  it('should handle addBun', () => {
    const bunIngredient = { ...mockIngredient, type: 'bun' };
    const action = addIngredient(bunIngredient);
    const state = burgerReducer(initialState, action);
    // const { id, ...clonedObject } = state.constructorBurger.bun;
    expect(state.constructorBurger.bun).toBe({ ...bunIngredient, id: 'MEFT93gEcUqpQ1DOttD8H' });
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerReducer(initialState, action);

    expect(state.constructorBurger.ingredients).toHaveLength(1);
    expect(state.constructorBurger.ingredients[0]).toMatchObject(
      mockIngredient
    );
    expect(state.constructorBurger.ingredients[0]).toHaveProperty('id');
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [{ ...mockIngredient, id: '123' }]
    };

    const action = removeIngredient('123');
    const state = burgerReducer(stateWithIngredient, action);

    expect(state.constructorBurger.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredientDown', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
      ]
    };

    const action = moveDown(0);
    const state = burgerReducer(stateWithIngredients, action);

    expect(state.constructorBurger.ingredients[0].id).toBe('2');
    expect(state.constructorBurger.ingredients[1].id).toBe('1');
  });

  it('should handle moveIngredientUp', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
      ]
    };

    const action = moveUp(1);
    const state = burgerReducer(stateWithIngredients, action);

    expect(state.constructorBurger.ingredients[0].id).toBe('2');
    expect(state.constructorBurger.ingredients[1].id).toBe('1');
  });
});

import {
  ingredientsReducer,
  fetchIngredients
} from '../services/ingredients-slice';
import { initialState } from '../services/ingredients-slice';

describe('проверка ingredientsReducer', () => {
  const mockData = [
    {
      _id: '1',
      name: 'Bun',
      type: 'bun',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'test.jpg',
      image_mobile: 'test-mobile.jpg',
      image_large: 'test-large.jpg',
      __v: 0
    },
    {
      _id: '2',
      name: 'Main',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'test.jpg',
      image_mobile: 'test-mobile.jpg',
      image_large: 'test-large.jpg',
      __v: 0
    },
    {
      _id: '4',
      name: 'Main',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'test.jpg',
      image_mobile: 'test-mobile.jpg',
      image_large: 'test-large.jpg',
      __v: 0
    }
  ];

  it('проверка вызова статуса isLoading при запросе данных', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка записи в стор при получении данных', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockData
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.buns).toHaveLength(1);
    expect(state.mains).toHaveLength(2);
    expect(state.error).toBeNull();
  });

  it('проверка записи ошибки в стор', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'some errors'
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('some errors');
  });
});

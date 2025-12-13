import { feedReducer, fetchFeeds } from '../services/feed-slice';
import { TOrder } from '@utils-types';

describe('проверка feedReducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
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

  it('проверка вызова статуса isLoading при запросе данных', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка записи в стор при получении данных', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: { orders: mockData }
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('проверка записи ошибки в стор', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      payload: 'some errors'
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('some errors');
  });
});

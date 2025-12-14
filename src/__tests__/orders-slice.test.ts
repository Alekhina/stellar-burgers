import { ordersReducer, fetchUserOrders } from '../services/orders-slice';
import { TOrder } from '@utils-types';
import { initialState } from '../services/orders-slice';

describe('проверка ordersReducer', () => {
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
    const action = { type: fetchUserOrders.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка записи в стор при получении данных', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockData
    };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('проверка записи ошибки в стор', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: 'some errors'
    };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('some errors');
  });
});

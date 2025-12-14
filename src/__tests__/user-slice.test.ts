import { userReducer, loginUser } from '../services/user-slice';
import { TUser } from '@utils-types';
import { initialState } from '../services/user-slice';

describe('auth reducer', () => {
  const mockData: TUser = {
    email: 'email@ya.com',
    name: 'test user'
  };

  it('проверка вызова статуса isLoading при вызове loginUser', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка записи в стор при вызове loginUser', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockData
    };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockData);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  it('проверка записи ошибки в стор', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'some errors'
    };
    const state = userReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('some errors');
  });
});

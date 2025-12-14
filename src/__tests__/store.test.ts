import { rootReducer } from '../services/rootReducer';

describe('проверка rootReducer', () => {
  it('проверка возвращения initialState', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('userOrders');
    expect(initialState).toHaveProperty('feed');
  });
});

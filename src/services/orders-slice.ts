import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { getOrdersApi } from '@api';

type TUserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrderByNumber',
  getOrderByNumberApi
);

export const fetchUserOrders = createAsyncThunk(
  'userOrders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: () => {}
});

export const ordersReducer = ordersSlice.reducer;

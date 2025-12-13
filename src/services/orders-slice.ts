import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../utils/burger-api';
import { getOrdersApi } from '../utils/burger-api';

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
export const getUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  getOrdersApi
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;

import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  items: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  error: string | null;
  currentIngredient: TIngredient | null;
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  items: [],
  buns: [],
  mains: [],
  sauces: [],
  error: null,
  currentIngredient: null,
  isLoading: false
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: () => {}
});

export const ingredientsReducer = ingredientsSlice.reducer;

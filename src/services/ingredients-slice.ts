import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

const filterIngredients = (ingredients: TIngredient[]) => {
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  return { buns, mains, sauces };
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.currentIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        const categorized = filterIngredients(action.payload);
        state.buns = categorized.buns;
        state.mains = categorized.mains;
        state.sauces = categorized.sauces;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { setCurrentIngredient } = ingredientsSlice.actions;

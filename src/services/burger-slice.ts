import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';

type TBurgerState = {
  constructorBurger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  // bun: TConstructorIngredient | null;
  // ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

export const initialState: TBurgerState = {
  constructorBurger: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(ingredientIds);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorBurger.bun = action.payload)
          : state.constructorBurger.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const newIngredients = [...state.constructorBurger.ingredients];

        [newIngredients[index], newIngredients[index - 1]] = [
          newIngredients[index - 1],
          newIngredients[index]
        ];
        state.constructorBurger.ingredients = newIngredients;
      }
    },

    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorBurger.ingredients.length - 1) {
        const newIngredients = [...state.constructorBurger.ingredients];

        [newIngredients[index], newIngredients[index + 1]] = [
          newIngredients[index + 1],
          newIngredients[index]
        ];
        state.constructorBurger.ingredients = newIngredients;
      }
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorBurger.ingredients =
        state.constructorBurger.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    closeModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.error = null;
        state.constructorBurger.bun = null;
        state.constructorBurger.ingredients = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

export const burgerReducer = burgerSlice.reducer;

export const { moveUp, moveDown, removeIngredient, addIngredient, closeModal } =
  burgerSlice.actions;

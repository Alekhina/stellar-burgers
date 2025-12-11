import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TRegisterData, registerUserApi } from '@api';
import { TLoginData, loginUserApi } from '@api';
import { updateUserApi } from '@api';
import { setCookie } from '../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const setUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
//
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (userData: TLoginData, { rejectWithValue }) => {
//     try {
//       const response = await loginUserApi(userData);
//       setCookie('accessToken', response.accessToken);
//       localStorage.setItem('refreshToken', response.refreshToken);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );
//
// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutApi();
//       deleteCookie('accessToken');
//       localStorage.removeItem('refreshToken');
//     } catch (error) {
//       deleteCookie('accessToken');
//       localStorage.removeItem('refreshToken');
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );
//
// export const getUser = createAsyncThunk(
//   'auth/getUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getUserApi();
//       return response.user;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );
//
// export const updateUser = createAsyncThunk(
//   'auth/updateUser',
//   async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
//     try {
//       const response = await updateUserApi(userData);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export const userReducer = userSlice.reducer;

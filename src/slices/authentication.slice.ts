import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthenticationService from '../services/authentication.service';
import CustomJwtService from '../services/custom-jwt.service';
import { ROLES, SESSION_STORAGE_JWT_VERIFY } from '../utils/constants';

export interface AuthenticationState {
  isAuthenticated: boolean;
  jwtExpirationTimestamp: string | null;
  authenticationResponseTime: string | null;
  authenticationFailed: boolean;
  userAuthorities: ROLES[];
  userLogin: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  jwtExpirationTimestamp: null,
  authenticationFailed: false,
  authenticationResponseTime: null,
  userAuthorities: [],
  userLogin: '',
};

export const loginUser = createAsyncThunk('auth/loginUser', async (args: { login: string; pass: string }) =>
  AuthenticationService.login(args.login, args.pass),
);

export const loginWithTaraJwt = createAsyncThunk('auth/loginWithTaraJwt', async (arg, thunkApi) => {
  await AuthenticationService.loginWithTaraJwt();
  thunkApi.dispatch(getUserinfo());
});

export const verifyAuthentication = createAsyncThunk('auth/verifyAuthentication', async () => {
  const response = await CustomJwtService.customJwtVerify();
  return response.status;
});

export const customJwtExtend = createAsyncThunk('auth/customJwtExtend', (arg, thunkApi) => {
  CustomJwtService.customJwtExtend().finally(() => thunkApi.dispatch(getUserinfo()));
});

export const getUserinfo = createAsyncThunk('auth/getUserinfo', () => CustomJwtService.customJwtUserinfo());


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setIsNotAuthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserinfo.fulfilled, (state, action) => {
      state.jwtExpirationTimestamp = action.payload?.JWTExpirationTimestamp;
      state.userAuthorities = action.payload?.authorities as ROLES[];
      state.userLogin = action.payload?.displayName;
      // state.customerSupportId = action.payload?.idCode;
    });
    builder.addCase(verifyAuthentication.fulfilled, (state) => {
      if (!state.isAuthenticated) state.isAuthenticated = true;
    });
    builder.addCase(verifyAuthentication.rejected, (state) => {
      state.isAuthenticated = false;
      window.sessionStorage.removeItem(SESSION_STORAGE_JWT_VERIFY);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isAuthenticated = false;
      state.authenticationFailed = true;
      state.authenticationResponseTime = new Date().toISOString();
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      window.location.href = window._env_.BACKOFFICE_URL;
      state.authenticationFailed = false;
    });
    builder.addCase(loginWithTaraJwt.rejected, (state) => {
      state.isAuthenticated = false;
      state.authenticationFailed = true;
      state.authenticationResponseTime = new Date().toISOString();
    });
    builder.addCase(loginWithTaraJwt.fulfilled, (state) => {
      window.location.href = window._env_.BACKOFFICE_URL;
      state.authenticationFailed = false;
    });
  },
});

export const { setIsAuthenticated, setIsNotAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;

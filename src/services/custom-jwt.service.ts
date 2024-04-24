import { AxiosResponse } from 'axios';
import http, { customJwtAxios } from './http.service';
import { UserInfo } from '../model/tim-response.model';

export const customJwt = 'customJwtCookie';

class CustomJwtService {
  customJwtBlacklist(): Promise<void> {
    return http.get('/custom-jwt-blacklist');
  }

  customJwtExtend(): Promise<void> {
    return http.get('/custom-jwt-extend');
  }

  customJwtUserinfo(): Promise<UserInfo> {
    return http.get('/custom-jwt-userinfo');
  }

  customJwtVerify(): Promise<AxiosResponse> {
    return customJwtAxios.post('/jwt/custom-jwt-verify', customJwt);
  }
}

export default new CustomJwtService();

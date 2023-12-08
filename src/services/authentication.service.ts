import http from './http.service';

class AuthenticationService {
  login(login: string, password: string): Promise<void> {
    return http.post('/cs-login', { login, password });
  }

  loginWithTaraJwt(): Promise<void> {
    return http.post('/cs-login-with-tara-jwt');
  }
}

export default new AuthenticationService();

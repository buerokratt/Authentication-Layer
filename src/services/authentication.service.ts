import http from './http.service';

class AuthenticationService {
  login(login: string, password: string): Promise<void> {
    return http.post('/cs-login', { login, password });
  }

  loginAnalytics(): Promise<void> {
    return http.post('/cs-login-analytics', {});
  }

  loginWithTaraJwt(): Promise<void> {
    return http.post('/cs-login-with-tara-jwt');
  }

  logout(): Promise<void> {
    return http.post('/cs-logout');
  }
}

export default new AuthenticationService();

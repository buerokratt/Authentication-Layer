import http from './http.service';

class AuthenticationService {
  login(login: string, password: string): Promise<void> {
    return http.post('/login', { login, password });
  }

  loginWithTaraJwt(): Promise<void> {
    return http.post('/login-with-tara');
  }
}

export default new AuthenticationService();

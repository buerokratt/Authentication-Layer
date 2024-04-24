import http from './http.service';

class AuthenticationService {
  login(login: string, password: string): Promise<void> {
    return http.post('/auth/login', { login, password });
  }

  loginWithTaraJwt(): Promise<void> {
    return http.get('/auth/tara/login');
  }
}

export default new AuthenticationService();

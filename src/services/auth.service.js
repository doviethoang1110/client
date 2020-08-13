import axios from 'axios';
import store from '../store';
class AuthService {
  login(user) {
    return axios
      .post(store.state.API_URL + '/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response)
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();

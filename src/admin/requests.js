import axios from 'axios';

axios.defaults.baseURL = 'https://webdev-api.loftschool.com';
axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.token}`};

axios.interceptors.response.use(
  response => (response),
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      return axios.post('/refreshToken').then(response => {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.token}`};
        originalRequest.headers.common = {'Authorization': `bearer ${localStorage.token}`};
        return axios(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

export default axios;
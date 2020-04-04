import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

// previne bloqueio por politica de CORS
api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default api;

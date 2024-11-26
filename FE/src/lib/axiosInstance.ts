import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',  // 여기에 API 기본 URL을 설정하세요
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

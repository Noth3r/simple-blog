import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2/',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
  validateStatus: (status) => status < 500,
});

export default api;

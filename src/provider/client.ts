import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://screenscape-api.onrender.com',
});

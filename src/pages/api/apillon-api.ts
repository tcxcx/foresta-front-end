import axios from 'axios';

export const apillonAuthAPI = axios.create({
  baseURL: 'https://api.apillon.io/auth',
  timeout: 3000,
  headers: {
    'Authorization': `Basic ${btoa(`${process.env.APILLON_API_KEY}:${process.env.APILLON_API_SECRET}`)}`
  }
});
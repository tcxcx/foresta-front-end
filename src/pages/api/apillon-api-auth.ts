import axios from 'axios';

export const apillonAuthAPI = axios.create({
  baseURL: 'https://api.apillon.io/auth',
  timeout: 3000,
  headers: {
    Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_APILLION_API_KEY_AUTH+ ':' + process.env.NEXT_PUBLIC_APILLION_API_SECRET_AUTH)}`,
  },
});
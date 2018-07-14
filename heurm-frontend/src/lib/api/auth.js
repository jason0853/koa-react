import axios from 'axios';

export const localRegister = ({ email, username, password }) =>
  axios.post('/api/auth/register/local', { email, username, password });

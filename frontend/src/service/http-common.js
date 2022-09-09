import axios from 'axios';
import { IP_ADDRS } from './Constant';
export default axios.create({
  baseURL: `${IP_ADDRS}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});
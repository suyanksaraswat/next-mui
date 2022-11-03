import axios from "axios";
import { apiUrl } from "./config";

const walletLogin = (data: any) => {
  try {
    const res = axios.post(`${apiUrl}/user/login-register-wallet`, data);
    return res;
  } catch (err) {
    return err;
  }
};

export default walletLogin;

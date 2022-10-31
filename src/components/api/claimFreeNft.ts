import axios from "axios";
import { apiUrl } from "./config";

const claimFreeNft = (data: any) => {
  try {
    const res = axios.post(`${apiUrl}/client-nft-request/create`, data);
    return res;
  } catch (err) {
    return err;
  }
};

export default claimFreeNft;

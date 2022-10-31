import axios from "axios";
import { apiUrl } from "./config";

const getNftsByCollectionId = (data: any) => {
  try {
    const res = axios.post(`${apiUrl}/nft/get-nft-by-collection`, data);
    return res;
  } catch (err) {
    return err;
  }
};

export default getNftsByCollectionId;

import axios from "axios";
import { apiUrl } from "./config";

const getNftDetails = (id: string | number) => {
  try {
    const res = axios.get(`${apiUrl}/nft/id/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export default getNftDetails;

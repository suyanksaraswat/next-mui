import axios from "axios";
import { apiUrl } from "./config";

const buyNftFromUser = (data: any, token: string) => {
  try {
    const res = axios.post(
      token
        ? `${apiUrl}/nft/buy-nft-from-user`
        : `${apiUrl}/nft/buy-nft-using-stripe`,
      data,
      {
        headers: { token },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export default buyNftFromUser;

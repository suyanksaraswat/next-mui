import axios from "axios";
import { apiUrl } from "./config";

const getCollectionDetails = (id: string | number) => {
  try {
    const res = axios.get(`${apiUrl}/collection/id/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export default getCollectionDetails;

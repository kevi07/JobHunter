import axios from "axios";
import { api_url } from "../../config";

const instance = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export async function apiCall(method, url, data) {
  try {
    const res = await instance[method](url, data);
    console.log(method, url, data)
    console.log(res.data)
    const response = {
      status: res.data.statusCode,
      ...res.data.data
    }

    console.log(response)

    return response
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default instance;

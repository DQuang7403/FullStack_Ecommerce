import axios from 'axios';
const BASE_URL = "https://dummyjson.com";

export const fetchAPI = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    console.log(response.data);
    return response.data
  } catch (err) {
    console.error(err);
  }
};
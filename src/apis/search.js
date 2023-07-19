import { API_STRING, ERROR_MESSAGE } from "../constants/config";
import { getCache, setCache } from "../utils/cacheStorage";
import client from "./clientApi";

export const searchAPI = async (q) => {
  const config = {
    params: {
      q,
    },
  };

  const requestUrl = new URLSearchParams(config.params).toString();
  const cachedData = await getCache(requestUrl);

  if (config.params.q === "") return [];

  if (cachedData) return cachedData.json();

  try {
    const { data } = await client.get(API_STRING, config);
    console.info("calling api");
    setCache(requestUrl, data);
    return data;
  } catch (err) {
    alert(ERROR_MESSAGE);
  }
};

import axios from "axios";
import storage from "./storage";

const updateOptions = () => {
  const user = storage("user");

  if (!!user.token) {
    return {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
  }

  return {};
};

async function fetcher(url: string) {
  const { data } = await axios.get(url, updateOptions());
  return data;
}

export default fetcher;

import Axios from "axios";

export default async function queryGraphql(apiUrl, query, variables = {}) {
  try {
    const res = await Axios.post(apiUrl, { query, variables });

    if (res.status !== 200) {
      console.log(res.statusText);
      throw new Error("Failed to fetch API");
    }

    return res.data?.data;
  } catch (err) {
    console.log(err.response.data);
    throw new Error("Failed to fetch API");
  }
}

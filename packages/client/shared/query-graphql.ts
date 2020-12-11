import Axios from "axios";
import { root } from "postcss";

export default async function queryGraphql(apiUrl, query, variables = {}) {
  const res = await Axios.post(apiUrl, { query, variables });

  if (res.status !== 200) {
    console.log(res.statusText);
    throw new Error(res.statusText);
  }

  if (res.data.errors) {
    const message = res.data.errors[0]?.extensions?.exception?.response?.message?.join(
      ". "
    );
    const rootMessage = res.data.errors[0].message;
    throw new Error(message ?? rootMessage);
  }

  return res.data?.data;
}

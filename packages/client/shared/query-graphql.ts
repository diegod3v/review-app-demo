export default async function queryGraphql(apiUrl, query, variables = {}) {
  const res = await fetch(
    `${apiUrl}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

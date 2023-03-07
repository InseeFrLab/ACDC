/* eslint-disable @typescript-eslint/no-explicit-any */
const fetcher = (url: string, method: string, body: any) => {
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    headers,
    method,
    body: body ? JSON.stringify(body) : null,
  })
    .then((r) => {
      if (r.ok) return r.json();
      throw new Error('An error occuring while fetching data');
    })
    .catch((e) => {
      throw new Error(`Fetch error for ${url} with the following error: ${e}`);
    });
};
export default fetcher;

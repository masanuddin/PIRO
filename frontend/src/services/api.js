const BASE_URL = "http://localhost:8080";

export const getDates = async () => {
  const res = await fetch(`${BASE_URL}/dates`);
  return res.json();
};
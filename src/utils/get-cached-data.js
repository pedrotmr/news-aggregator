export const getCachedData = ({ key, expiration }) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < expiration) {
      return data;
    }
  }
  return null;
};

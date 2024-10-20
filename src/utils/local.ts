const setItemLocalStorage = (key: string, items: Record<string, any>, expiryTimeInMinutes: number) => {
  const now = new Date();
  const value = {
    ...items,
    expiry: now.getTime() + expiryTimeInMinutes * 60 * 1000
  };
  localStorage.setItem(key, JSON.stringify(value));
};

const getItemLocalStorage = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item;
};

export { getItemLocalStorage, setItemLocalStorage }

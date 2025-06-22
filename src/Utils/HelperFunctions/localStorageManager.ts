export const setItem = (name: string, data: Object): boolean => {
  try {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};

export const getItem = (name: string): Object | null => {
  const requestedData = localStorage.getItem(name);
  if (requestedData === null) return null;

  return JSON.parse(requestedData);
};

export const removeItem = (name: string): void => {
  localStorage.removeItem(name);
};

export const setItem = (name: string, data: Object): boolean => {
  try {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};

export const getItem = (name: string) => {
  const requestedData = localStorage.getItem(name);
  if (requestedData === null) return;

  return JSON.parse(requestedData);
};

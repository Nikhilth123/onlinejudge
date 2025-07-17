export const clearCodeDrafts = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('code-')) {
      localStorage.removeItem(key);
    }
  });
};

export function setInLocalStorage(key, value) {
  if (!key || !value) {
    throw new Error('Key and value are required');
  }
  typeof window !== 'undefined' &&
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key, defaultValue = null) {
  const value = typeof window !== 'undefined' && localStorage.getItem(key);
  if (value && typeof value !== 'string') {
    throw new Error('Value must be a string.');
  }
  return value ? JSON.parse(value) : defaultValue;
}

export function removeFromLocalStorage(key) {
  if (!key) {
    throw new Error('Key is required');
  }
  typeof window !== 'undefined' && localStorage.removeItem(key);
}

export function clearALlLocalStorage() {
  typeof window !== 'undefined' && localStorage.clear();
}

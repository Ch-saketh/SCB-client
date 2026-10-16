export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to set localStorage key: ${key}`, err);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Failed to remove localStorage key: ${key}`, err);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Failed to clear localStorage', err);
    }
  },
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string, minLength = 6): boolean => {
  return password.trim().length >= minLength;
};

export const isNotEmpty = (val: string): boolean => {
  return val.trim().length > 0;
};

let accessToken: string | null = null;

export const tokenStorage = {
  setToken: (token: string | null): void => {
    accessToken = token;
  },

  getToken: (): string | null => {
    return accessToken;
  },

  removeToken: (): void => {
    accessToken = null;
  },

  hasToken: (): boolean => {
    return accessToken !== null;
  },
};

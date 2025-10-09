//추석연휴간 GET 함수를 구현할때는 토큰 사용하실 일 없으실거예요.
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

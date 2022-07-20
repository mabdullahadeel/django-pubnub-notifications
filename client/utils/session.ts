import axiosInstance from "../services/axios";

const TOKEN_KEY = "django-pubnub-notification-token";

export const setSession = (accessToken: string) => {
  if (accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Token ${accessToken}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export const getSession = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const resetSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete axiosInstance.defaults.headers.common["Authorization"];
};

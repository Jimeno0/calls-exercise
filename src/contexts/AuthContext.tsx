import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, REFRESH_TOKEN } from "../queries/mutations";
import { localStorageManager } from "../core";

export const AuthContext = createContext({
  isUserLoggedIn: false,
  handleLogin: ({ username, password }: LoginProps) => {},
  updateToken: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

type LoginProps = {
  username: string;
  password: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [login, { data }] = useMutation(LOGIN);
  const [updateToken, { data: updateTokenData, loading, called }] =
    useMutation(REFRESH_TOKEN);

  const loginRefreshToken = data?.login?.refresh_token;
  const loginAccessToken = data?.login?.access_token;

  const refreshRefreshToken = updateTokenData?.refreshTokenV2?.refresh_token;
  const refreshAccessToken = updateTokenData?.refreshTokenV2?.access_token;

  useEffect(() => {
    if (!loginRefreshToken || !loginAccessToken) return;
    localStorageManager.set("refresh_token", loginRefreshToken);
    localStorageManager.set("access_token", loginAccessToken);
  }, [loginRefreshToken, loginAccessToken]);

  useEffect(() => {
    if (!refreshRefreshToken || !refreshAccessToken) return;
    localStorageManager.set("refresh_token", refreshRefreshToken);
    localStorageManager.set("access_token", refreshAccessToken);
  }, [refreshRefreshToken, refreshAccessToken]);

  useEffect(() => {
    updateToken();
  }, []);

  useEffect(() => {
    if (!refreshAccessToken) return;
    setIsUserLoggedIn(true);
  }, [refreshAccessToken]);

  const handleLogin = ({ username, password }: LoginProps) => {
    login({ variables: { input: { username, password } } });
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {};

  const value = {
    isUserLoggedIn,
    handleLogin,
    handleLogout,
    updateToken,
  };

  if (!called || loading) return <div />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

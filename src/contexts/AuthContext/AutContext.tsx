import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, REFRESH_TOKEN } from "../../gql/mutations";
import { localStorageManager } from "../../core";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants";

export const AuthContext = createContext({
  isUserLoggedIn: false,
  handleLogin: ({ username, password }: LoginProps) => {},
  updateToken: () => {},
  handleLogout: () => {},
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
  const navigate = useNavigate();

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
    updateToken({
      onCompleted: () => {
        setIsUserLoggedIn(true);
      },
    });
  }, []);

  const handleLogin = ({ username, password }: LoginProps) => {
    login({
      variables: { input: { username, password } },
      onCompleted: () => {
        setIsUserLoggedIn(true);
      },
    });
  };

  const handleLogout = () => {
    console.log({ handleLogout: true });
    localStorageManager.remove("refresh_token");
    localStorageManager.remove("access_token");
    setIsUserLoggedIn(false);

    return navigate(PATHS.login);
  };

  const value = {
    isUserLoggedIn,
    handleLogin,
    handleLogout,
    updateToken,
  };

  if (!called || loading) return <div />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

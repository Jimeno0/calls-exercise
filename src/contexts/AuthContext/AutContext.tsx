import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, REFRESH_TOKEN } from "gql/mutations";
import { localStorageManager } from "core";
import { useNavigate } from "react-router-dom";
import { PATHS } from "constants/index";

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

  const [login] = useMutation(LOGIN);
  const [updateToken, { loading, called }] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    updateToken({
      onCompleted: ({ refreshTokenV2 }) => {
        const { access_token, refresh_token } = refreshTokenV2;
        localStorageManager.set("refresh_token", refresh_token);
        localStorageManager.set("access_token", access_token);
        setIsUserLoggedIn(true);
      },
    });
  }, []);

  const handleLogin = ({ username, password }: LoginProps) => {
    login({
      variables: { input: { username, password } },
      onCompleted: ({ login }) => {
        const { access_token, refresh_token } = login;
        localStorageManager.set("refresh_token", refresh_token);
        localStorageManager.set("access_token", access_token);
        setIsUserLoggedIn(true);
      },
    });
  };

  const handleLogout = () => {
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

import { createContext } from "react";

export const AuthContext = createContext({ user: true });

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = true;

  const login = () => {};

  const logout = () => {};

  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

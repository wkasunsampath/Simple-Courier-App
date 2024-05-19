import React, { useMemo, useState } from "react";
import { ChildrenProps, UserData } from "../utils/types";

export const AuthContext = React.createContext<
  | {
      token: string | null;
      isLoggedIn: boolean;
      loggedUser: UserData | null;
      login: (user: UserData, token: string) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ChildrenProps }) => {
  const getToken = () => localStorage.getItem("token");
  const getUser = () => localStorage.getItem("user");

  const [token, setToken] = useState(getToken() ?? null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loggedUser, setLoggedUser] = useState<UserData | null>(getUser() ? JSON.parse(getUser()!) : null);

  const login = (user: UserData, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setIsLoggedIn(true);
    setLoggedUser(user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setIsLoggedIn(false);
    setLoggedUser(null);
  };

  const value = useMemo(() => {
    return {
      token,
      isLoggedIn,
      loggedUser,
      login,
      logout,
    };
  }, [loggedUser, token, isLoggedIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface AuthContextType {
  account: InjectedAccountWithMeta | null;
  jwtToken: string | null;
  login: (account: InjectedAccountWithMeta, jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const login = useCallback((account: InjectedAccountWithMeta, jwtToken: string) => {
    setAccount(account);
    setJwtToken(jwtToken);
    // Here you can add additional logic for when a user logs in, if necessary.
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
    setJwtToken(null);
    // Here you can add additional logic for when a user logs out, if necessary.
  }, []);

  return (
    <AuthContext.Provider value={{ account, jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Custom hooks to access specific parts of the context
export const useAccount = () => {
  const { account } = useAuth();
  return account;
};

export const useJwtToken = () => {
  const { jwtToken } = useAuth();
  return jwtToken;
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface AuthContextType {
  account: InjectedAccountWithMeta | { meta: { name: string }; address: string } | null;
  jwtToken: string | null;
  role: "user" | "admin" | null;
  login: (account: InjectedAccountWithMeta | { meta: { name: string }; address: string }, jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<InjectedAccountWithMeta | { meta: { name: string }; address: string } | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);

  const login = useCallback((account: InjectedAccountWithMeta | { meta: { name: string }; address: string }, jwtToken: string) => {
    setAccount(account);
    setJwtToken(jwtToken);
    const isAdmin = account.address === process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS;
    setRole(isAdmin ? "admin" : "user");
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
    setJwtToken(null);
    setRole(null);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/session', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setAccount(data.account);
          setRole(data.role);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Session check failed:", error);
        logout();
      }
    };
    checkSession();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ account, jwtToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export const useAccount = () => {
  const { account } = useAuth();
  return account;
};
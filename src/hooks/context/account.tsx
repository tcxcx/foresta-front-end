"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect
} from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface AuthContextType {
  account: InjectedAccountWithMeta | null;
  jwtToken: string | null;
  role: "user" | "admin" | null;
  login: (account: InjectedAccountWithMeta, jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);


  const login = useCallback(
    (account: InjectedAccountWithMeta, jwtToken: string) => {
      setAccount(account);
      setJwtToken(jwtToken);
      const isAdmin = account.address === adminAddress; 
      setRole(isAdmin ? "admin" : "user");
    },
    []
  );

  const logout = useCallback(() => {
    setAccount(null);
    setJwtToken(null);
  }, []);

   // This effect will run once on component mount to check if the user is already logged in by checking the existence of a session cookie
   useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/session', {
          credentials: 'include' // Needed to include HTTP-only cookies in the request
        });
        if (response.ok) {
          const { account, role } = await response.json();
          // Assume the response includes the account and role
          // Adjust these lines based on your actual API response structure
          setAccount(account);
          setRole(role);
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

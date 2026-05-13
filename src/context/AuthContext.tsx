import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Simple in-memory user store
const userStore: { name: string; email: string; password: string }[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = userStore.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ name: found.name, email: found.email });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    userStore.push({ name, email, password });
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

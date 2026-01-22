import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginClient, registerClient, logoutClient, getCurrentUser, getToken } from '../../services/api';
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  address: Address;
  industry?: string;
  companySize?: string;
  website?: string;
  role: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  companyName: string;
  phoneNumber: string;
  address: Address;
  industry?: string;
  companySize?: string;
  website?: string;
  taxId?: string;
  registrationNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginClient({ email, password });
    setUser(response.data.client);
  };

  const signup = async (data: SignupData) => {
    const response = await registerClient(data);
    setUser(response.data.client);
  };

  const logout = () => {
    logoutClient();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
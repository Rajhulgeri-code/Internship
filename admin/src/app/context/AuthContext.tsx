import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser as apiLogin, logoutUser as apiLogout, getCurrentUser, getToken } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = getToken();
    const savedUser = getCurrentUser();
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Attempting login for', email);
      
      const response = await apiLogin({ email, password });
      
      console.log('AuthContext: API response:', response);
      
      if (response.success && response.data) {
        // Check if user is admin
        if (response.data.user.role !== 'admin') {
          console.error('AuthContext: User is not admin');
          throw new Error('Access denied. Admin credentials required.');
        }

        console.log('AuthContext: Login successful');
        setIsAuthenticated(true);
        setUser(response.data.user);
        return true;
      }
      
      console.error('AuthContext: Login failed - invalid response');
      return false;
      
    } catch (error: any) {
      console.error('AuthContext: Login error:', error);
      // Re-throw the error so the Login component can display it
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
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
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - adjust if your backend runs on a different port
// Use relative URL when served from same origin, or absolute URL for development
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Get auth token from localStorage
  const getToken = () => localStorage.getItem("ethioagri-token");

  // Save auth token to localStorage
  const saveToken = (token: string) => {
    localStorage.setItem("ethioagri-token", token);
  };

  // Remove auth token from localStorage
  const removeToken = () => {
    localStorage.removeItem("ethioagri-token");
    localStorage.removeItem("ethioagri-user");
  };

  useEffect(() => {
    // Check for existing session by verifying token with backend
    const token = getToken();
    if (token) {
      // Verify token by fetching current user
      fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Invalid token');
          }
        })
        .then(data => {
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            removeToken();
          }
        })
        .catch(() => {
          removeToken();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token and user data
        saveToken(data.token);
        setUser(data.user);
        localStorage.setItem("ethioagri-user", JSON.stringify(data.user));
        setIsLoading(false);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${data.user.name}`,
        });
        return true;
      } else {
        setIsLoading(false);
        toast({
          title: "Login failed",
          description: data.message || "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Login failed",
        description: "Unable to connect to server. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token and user data
        saveToken(data.token);
        setUser(data.user);
        localStorage.setItem("ethioagri-user", JSON.stringify(data.user));
        setIsLoading(false);
        toast({
          title: "Account created!",
          description: `Welcome, ${name}!`,
        });
        return true;
      } else {
        setIsLoading(false);
        toast({
          title: "Signup failed",
          description: data.message || "Failed to create account",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Signup failed",
        description: "Unable to connect to server. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    const token = getToken();
    
    // Call logout endpoint (optional, token will be invalid on client side anyway)
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        // Ignore errors on logout
      }
    }
    
    // Clear local state
    setUser(null);
    removeToken();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

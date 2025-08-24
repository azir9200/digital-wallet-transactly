import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  balance?: number;
  isActive: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '+1234567890',
    role: 'user',
    balance: 2500.50,
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'agent@example.com',
    phone: '+1234567891',
    role: 'agent',
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567892',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role?: UserRole): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email and role (if specified)
    const foundUser = mockUsers.find(u => 
      u.email === email && (role ? u.role === role : true)
    );

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    // Simulate password check (in real app, this would be handled by backend)
    if (password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(foundUser));
  };

  const register = async (userData: RegisterData): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      balance: userData.role === 'user' ? 0 : undefined,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Add to mock data (in real app, this would be sent to backend)
    mockUsers.push(newUser);

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
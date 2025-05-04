import React, { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const { signOut, navigate } = useClerk();

  // You can add custom logic here if needed
  const login = () => navigate('/login');
  const register = () => navigate('/signup');
  const logout = () => signOut();

  return (
    <AuthContext.Provider value={{ user, isSignedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [themeMode, setThemeMode] = useState('light');

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const toggleTheme = () => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <AuthContext.Provider value={{ user, login, logout, themeMode, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

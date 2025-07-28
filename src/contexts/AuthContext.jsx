import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('dashboardUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('dashboardUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('Email sudah terdaftar');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        department: userData.department,
        position: userData.position,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (simulate database)
      existingUsers.push({ ...newUser, password: userData.password });
      localStorage.setItem('dashboardUsers', JSON.stringify(existingUsers));
      
      // Set current user
      setUser(newUser);
      localStorage.setItem('dashboardUser', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsers = JSON.parse(localStorage.getItem('dashboardUsers') || '[]');
      const user = existingUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Email atau password salah');
      }

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        position: user.position,
        createdAt: user.createdAt
      };

      setUser(userWithoutPassword);
      localStorage.setItem('dashboardUser', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('dashboardUser');
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Load data from localStorage on page refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedRole && storedUser) {
      setUser(storedUser);
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function (called after successful login API call)
  const login = (userData, token, userRole) => {
    // Save in localStorage
      console.log("Logging in user:", userData);
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userId', userData.id); // ✅ Save userId separately

    // Update context state
    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);

    // Navigate to role-based dashboard
    navigate(`/${userRole}/home`);
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('userId'); // ✅ Clear userId too

    // Clear context state
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);

    // Redirect to login
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

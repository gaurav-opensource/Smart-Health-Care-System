import { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, role, isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  // Toggle profile dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  // Handle logout
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsOpen(false);
  };

  // Detect scroll to apply background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic nav link class
  const navClass = (isActive) =>
    `text-gray-700 hover:text-purple-600 transition-colors ${
      isActive ? 'text-purple-600 font-semibold' : ''
    } ${!isScrolled ? 'text-black' : 'text-gray-700'}`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side nav links */}
          <div className="hidden md:flex space-x-6">
            {!isAuthenticated && (
              <>
                <NavLink to="/about" className={({ isActive }) => navClass(isActive)}>
                  About
                </NavLink>
                <NavLink to="/insurance" className={({ isActive }) => navClass(isActive)}>
                  Insurance
                </NavLink>
                <NavLink to="/faq" className={({ isActive }) => navClass(isActive)}>
                  FAQ
                </NavLink>
              </>
            )}
            {isAuthenticated && role === 'admin' && (
              <NavLink to="/admin/home" className={({ isActive }) => navClass(isActive)}>
                Admin Dashboard
              </NavLink>
            )}
          {isAuthenticated && role === 'doctor' && (
  <>
    <NavLink to="/pending/doctor" className={({ isActive }) => navClass(isActive)}>
      Pending Appointments
    </NavLink>
    <NavLink to="/compete/doctor" className={({ isActive }) => navClass(isActive)}>
      Completed Appointments
    </NavLink>
  </>
)}


            {isAuthenticated && role === 'user' && (
              <NavLink to="/doctorlist" className={({ isActive }) => navClass(isActive)}>
                Doctor List
              </NavLink>
            )}
          </div>

          {/* Centered logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 ml-7">
            <Link
              to="/"
              className={`flex items-center text-2xl font-bold ${
                isScrolled ? 'text-purple-900' : 'text-black'
              }`}
            >
              Best<sup className="text-xs">®</sup>
              <span className="text-teal-500 ml-1">HEALTH</span>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className={`${
                    isScrolled ? 'text-purple-600' : 'text-black'
                  } hover:text-purple-800`}
                >
                  → Sign in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  Register now
                </NavLink>
              </>
            ) : (
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition duration-200 ${
                    isScrolled
                      ? 'bg-gray-100 text-gray-700 hover:text-purple-600 hover:bg-purple-100'
                      : 'bg-white text-black hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  Dashboard
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all duration-200 ease-out ${
                    isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <Link
                    to={`/${role}/profile`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${
                isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-black hover:text-gray-800'
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden bg-white text-gray-700 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {!isAuthenticated && (
            <>
              <Link to="/about" className="block px-3 py-2 hover:text-purple-600" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/insurance" className="block px-3 py-2 hover:text-purple-600" onClick={toggleMenu}>
                Insurance
              </Link>
              <Link to="/faq" className="block px-3 py-2 hover:text-purple-600" onClick={toggleMenu}>
                FAQ
              </Link>
            </>
          )}
          {isAuthenticated && role === 'admin' && (
            <Link to="/admin/home" className="block px-3 py-2 hover:text-purple-600" onClick={toggleMenu}>
              Admin Dashboard
            </Link>
          )}
          {isAuthenticated && role === 'doctor' && (
            <Link to="/doctor/home" className="block px-3 py-2 hover:text-purple-600" onClick={toggleMenu}>
              Appointments
            </Link>
          )}
          {isAuthenticated && role === 'user' && (
            <Link to="/doctorlist" className="block px-3 py-2 hover:text-purple-600" onClick={toggleMenu}>
              Doctor List
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block px-3 py-2 text-purple-600 hover:text-purple-800" onClick={toggleMenu}>
                → Sign in
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 bg-purple-600 text-white rounded-full text-center hover:bg-purple-700"
                onClick={toggleMenu}
              >
                Register now
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/${role}/profile`}
                className="block px-3 py-2 hover:text-purple-600"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 hover:text-purple-600"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

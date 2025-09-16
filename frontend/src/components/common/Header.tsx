import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, 
  User, 
  LogOut, 
  Settings, 
  Menu, 
  X,
  GraduationCap,
  Users,
  BarChart3
} from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.accountType) {
      case 'Admin':
        return '/admin/dashboard';
      case 'Instructor':
        return '/instructor/dashboard';
      case 'Student':
        return '/student/dashboard';
      default:
        return '/';
    }
  };

  const getNavItems = () => {
    if (!isAuthenticated || !user) {
      return [
        { name: 'Courses', href: '/courses' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ];
    }

    const baseItems = [
      { name: 'Courses', href: '/courses' },
      { name: 'Dashboard', href: getDashboardLink() },
    ];

    if (user.accountType === 'Instructor') {
      baseItems.push({ name: 'My Courses', href: '/instructor/courses' });
    }

    if (user.accountType === 'Student') {
      baseItems.push({ name: 'My Learning', href: '/student/enrolled-courses' });
    }

    return baseItems;
  };

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900">EduPlatform</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-secondary-700">
                    {user.firstname} {user.lastname}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-secondary-200">
                      <p className="text-sm font-medium text-secondary-900">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-xs text-secondary-500 capitalize">
                        {user.accountType}
                      </p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-secondary-600" />
              ) : (
                <Menu className="w-5 h-5 text-secondary-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            <nav className="flex flex-col space-y-2">
              {getNavItems().map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-2 border-t border-secondary-200">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 rounded-lg font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
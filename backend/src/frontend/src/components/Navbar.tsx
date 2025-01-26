import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {loading && <p>Loading...</p>}
        {!isAuthenticated ? (
          <>
             <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
         ) : (
          <>
              <li>{user?.username}</li>
             <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
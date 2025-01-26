import React, { useState } from 'react';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate()

    if (isAuthenticated)
    {
        navigate('/')
    }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
      <div className="login">
        {loading && <p>Loading...</p>}
          <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;
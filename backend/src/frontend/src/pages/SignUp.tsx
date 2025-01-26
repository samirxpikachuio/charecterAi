import React, { useState } from 'react';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate()

    if (isAuthenticated)
    {
        navigate('/')
    }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      await signup(username, email, password)
  };

  return (
    <div className="signup">
       {loading && <p>Loading...</p>}
          <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
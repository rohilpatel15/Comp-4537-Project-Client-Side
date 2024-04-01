import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('endpoint', { email, password }); // replace with api endpoint
      if (response.data.success) {
        alert('Login successful!');
        if (email === 'admin@admin.com') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        alert('Email or password incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="LoginFields">
      <h1>Log in or Sign up!</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/signup')}>Sign up</button>
      </form>
    </div>
  );
}

export default Login;

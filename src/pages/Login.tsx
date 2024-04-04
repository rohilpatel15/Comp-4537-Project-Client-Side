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
      // Send POST request to Quan's DB to retrieve JWT upon successful login
      const response = await axios.post('https://dolphin-app-jewdr.ondigitalocean.app/auth/login', { email, password, withCredentials: true});
      
      if (response.status === 200) {
        console.log(response.headers);
        const token = response.data.token; // Extract JWT token from response
        localStorage.setItem('token', token); // Store the token in localStorage
  
        alert('Login successful!');
        if (email === 'admin@admin.com') { // Redirect to admin page if email is admin
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

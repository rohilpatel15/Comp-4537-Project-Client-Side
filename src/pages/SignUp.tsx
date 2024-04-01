import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dolphin-app-jewdr.ondigitalocean.app/auth/register', { email, password });
  
      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="SignUpFields">
      <h1>Sign up!</h1>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign up</button>
        <button type="button" onClick={() => navigate('/')}>Go back</button>
      </form>
    </div>
  );
}

export default SignUp;
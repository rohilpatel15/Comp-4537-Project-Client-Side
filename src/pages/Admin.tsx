import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface EndpointStat {
  id: number;
  method: string;
  endpoint: string;
  requests: number;
}

interface UserStat {
  id: number;
  username: string;
  email: string;
  totalRequests: number;
}

function Admin() {
  const [endpointStats, setEndpointStats] = useState<EndpointStat[]>([]);
  const [userStats, setUserStats] = useState<UserStat[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEndpointStats();
    fetchUserStats();
  }, []);

  const fetchEndpointStats = async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      if (!token) {
        navigate('/login'); // Redirect to login if token is not available
        return;
      }

      const response = await axios.get<EndpointStat[]>('endpoint', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
        },
      });
      setEndpointStats(response.data);
    } catch (error) {
      console.error('Error fetching endpoint stats:', error);
      handleAuthenticationError(error);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get<UserStat[]>('endpoint', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      handleAuthenticationError(error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token'); // Remove token on logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAuthenticationError = (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token'); // Remove invalid/expired token
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Endpoint Stats</h2>
    </div>
  );
}

export default Admin;

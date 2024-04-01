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
      await axios.post('endpoint'); // replace with actual logout endpoint
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
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>
          {endpointStats.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.method}</td>
              <td>{stat.endpoint}</td>
              <td>{stat.requests}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>User Stats</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Total Requests</th>
          </tr>
        </thead>
        <tbody>
          {userStats.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.totalRequests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

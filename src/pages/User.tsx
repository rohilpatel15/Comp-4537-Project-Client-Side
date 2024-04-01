import { useEffect, useState } from 'react';
import axios, {AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserAPIUsage {
  endpoint: string;
  requests: number;
}

function UserPage() {
  const [apiUsage, setApiUsage] = useState<UserAPIUsage[]>([]);
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAPIUsage();
  }, []);

  const fetchAPIUsage = async () => {
    try {
      // Get JWT token from localStorage (assuming it was stored after login)
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login'); // Redirect to login if token is not available
        return;
      }

      // Include JWT token in Authorization header of the request
      const response = await axios.get<UserAPIUsage[]>('endpoint', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApiUsage(response.data);

      const total = response.data.reduce((acc, curr) => acc + curr.requests, 0);
      setTotalUsage(total);
    } catch (error: unknown) { // Explicitly type error as AxiosError
      console.error('Error fetching API usage:', error);

      // Handle AxiosError to access response status
      if ((error as AxiosError).response?.status === 401) {
        localStorage.removeItem('token'); // Remove invalid/expired token
        navigate('/login'); // Redirect to login page
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>API Consumption</h2>
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>
          {apiUsage.map((usage, index) => (
            <tr key={index}>
              <td>{usage.endpoint}</td>
              <td>{usage.requests}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total API Requests: {totalUsage}</h3>
    </div>
  );
}

export default UserPage;

import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserAPIUsage {
  endpoint: string;
  requests: number;
}

function UserPage() {
  const [apiUsage, setApiUsage] = useState<UserAPIUsage[]>([]);
  const [totalUsage, setTotalUsage] = useState<number>(0);

  useEffect(() => {
    fetchAPIUsage();
  }, []);

  const fetchAPIUsage = async () => {
    try {
      const response = await axios.get<UserAPIUsage[]>('endpoint'); // replace with user usage endpoint
      setApiUsage(response.data);
      
      // Calculate total API usage
      const total = response.data.reduce((acc, curr) => acc + curr.requests, 0);
      setTotalUsage(total);
    } catch (error) {
      console.error('Error fetching API usage:', error);
    }
  };

  return (
    <div>
      <h1>User Page</h1>

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

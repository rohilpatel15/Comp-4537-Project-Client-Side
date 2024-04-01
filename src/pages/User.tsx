import axios, { AxiosError } from 'axios';
import { useState } from 'react';

function UserPage() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');

  // Function to retrieve JWT token from localStorage or context
  const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token from localStorage
    // Redirect to the login page or any other appropriate action
    window.location.href = '/login'; // Replace '/login' with your actual login page URL
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(name);
  
    const authToken = getAuthToken();
    if (!authToken) {
      console.error('JWT token not found.');
      return;
    }
  
    try {
      const response = await axios.post('https://dolphin-app-jewdr.ondigitalocean.app/ai-prompt/story', {
        inputs: `My name is ${name}`,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include JWT token in Authorization header
        },
      });
  
      if (response.data.length) {
        const generatedText = response.data[0].generated_text;
        setGeneratedStory(generatedText);
      } else {
        console.error('No generated story found in the response.');
        setGeneratedStory('');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error fetching AI-generated story:', axiosError);
        console.log('Response data:', axiosError.response?.data); // Log response data in case of error
      } else {
        console.error('Unknown error:', error);
      }
      setGeneratedStory('');
    }
  };
  

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {submittedName && (
        <div>
          <h2>Generated Story for {submittedName}:</h2>
          <p>{generatedStory}</p>
        </div>
      )}
    </div>
  );
}

export default UserPage;

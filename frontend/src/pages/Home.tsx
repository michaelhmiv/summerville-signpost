import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to map view as the main experience
    navigate('/');
  }, [navigate]);
  
  return null;
}

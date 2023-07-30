
import { onAuthStateChanged } from 'firebase/auth';
import Landing from './Landing/Landing';
import React,{useEffect,useState} from 'react'
import { auth } from '@/backend/firebase';
import Dashboard from './Dashboard/Dashboard';

export default function Home() {

  const [user, setUser] = useState(false);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, [user]);

  return (
    user ? (
      <Dashboard />
    ) : (
      <Landing />
    )
  )
}

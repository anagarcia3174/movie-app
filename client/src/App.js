import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import { useEffect } from 'react';
import { auth } from './services/firebase';
import { useDispatch  } from 'react-redux'
import { login, logout  } from './redux/slices/userSlice';
import ProfileScreen from './screens/ProfileScreen'
import  {ProtectedRoute}  from './components/ProtectedRoute';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else {
        dispatch(logout());
      }
      setIsLoading(false)
    })

    return unsubscribe;
  }, [dispatch]);

  if(isLoading){
    return (<h2>Loading...</h2>)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomeScreen/>}/>
          <Route 
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

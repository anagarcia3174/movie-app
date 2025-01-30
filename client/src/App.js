import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { useEffect } from "react";
import { auth, checkAndRefreshSession } from "./services/firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/slices/userSlice";
import ProfileScreen from "./screens/ProfileScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useState } from "react";
import LoadingScreen from "./screens/LoadingScreen";
import MediaScreen from "./screens/MediaScreen";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          await checkAndRefreshSession();
          
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email,
              displayName: userAuth.displayName,
              photoURL: userAuth.photoURL,
              emailVerified: userAuth.emailVerified,
            })
          );
        } catch (error) {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <div className="App">
      <WelcomeModal />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/movie/:id" element={<MediaScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

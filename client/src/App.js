import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomeScreen/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;

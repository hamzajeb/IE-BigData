import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';


function App() {
  return (
    <div className="App" >
          <Router>
      <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;

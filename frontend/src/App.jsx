import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<div><h1>Home</h1><a href="/login">Login</a> | <a href="/signup">Signup</a></div>} />
      </Routes>
    </Router>
  )
}

export default App

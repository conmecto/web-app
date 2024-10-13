import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import MainContent from './pages/main';
// import Home from './pages/home';
import Footer from './components/footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex bg-black">
        <Routes>
          <Route path="/" element={<MainContent />} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
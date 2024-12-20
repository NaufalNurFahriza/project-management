import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Task from './pages/TaskPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:projectId" element={<Task />} /> {/* Changed from /task */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
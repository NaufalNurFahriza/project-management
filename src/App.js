import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Task from './pages/TaskPage';

const App = () => {
  return (

      <Router>
        <div>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks/:projectId" element={<Task />} />
            </Routes>
          </Container>
        </div>
      </Router>
  );
};

export default App;

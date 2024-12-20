import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material'; // Added Container here
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Task from './pages/TaskPage';

const theme = createTheme({
  // Customize theme here
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
};

export default App;

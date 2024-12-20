import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Container 
} from '@mui/material';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Manager
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            color="inherit"
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Projects
          </Button>
          {location.pathname.includes('/tasks/') && (
            <Button 
              component={Link} 
              to={location.pathname}
              color="inherit"
              sx={{ ml: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Current Tasks
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
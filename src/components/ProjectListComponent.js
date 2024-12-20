import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../utils/api/apiProvider';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid,
  CircularProgress,
  Alert 
} from '@mui/material';

const ProjectListComponent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching projects...');
    fetchProjects()
      .then((data) => {
        console.log('Projects fetched successfully:', data);
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ margin: 4 }} />;
  if (error) return <Alert severity="error" sx={{ margin: 4 }}>{error}</Alert>;

  return (
    <Grid container spacing={3} sx={{ padding: 4 }}>
      {projects.map((project) => (
        <Grid item xs={12} md={6} key={project.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {project.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Created: {new Date(project.created_at).toLocaleDateString()}
              </Typography>
              <Button 
                component={Link} 
                to={`/tasks/${project.id}`}
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
              >
                View Tasks
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectListComponent;
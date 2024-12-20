import React, { useState } from 'react';
import { createProject } from '../utils/api/apiProvider';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Box
} from '@mui/material';

const AddProjectForm = ({ onProjectAdded }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus({ type: '', message: '' });
  
      try {
        await createProject(formData);
        setFormData({ name: '', description: '' });
        setStatus({ type: 'success', message: 'Project created successfully!' });
        if (onProjectAdded) onProjectAdded();
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to create project' });
      }
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add New Project
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Create Project
          </Button>
        </Box>
        {status.message && (
          <Alert 
            severity={status.type === 'error' ? 'error' : 'success'}
            sx={{ mt: 2 }}
          >
            {status.message}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AddProjectForm;
import React, { useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  TextField, 
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button, 
  Typography, 
  Alert,
  Box
} from '@mui/material';

const AddTaskForm = ({ projectId, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'To Do'
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`https://test-fe.sidak.co.id/api/projects/${projectId}/tasks`, formData);
      setFormData({ name: '', status: 'To Do' });
      setStatus({ type: 'success', message: 'Task created successfully!' });
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to create task' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add New Task
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Task Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
              required
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Add Task
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

export default AddTaskForm;
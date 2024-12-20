import React from 'react';
import axios from 'axios';
import { 
  Paper, 
  Select, 
  MenuItem, 
  Typography,
  Box
} from '@mui/material';

const TaskItem = ({ task, onTaskUpdated }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#f5f5f5';
      case 'In Progress':
        return '#e3f2fd';
      case 'Completed':
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.put(`https://test-fe.sidak.co.id/api/tasks/${task.id}`, {
        status: newStatus
      });
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 2, 
        backgroundColor: getStatusColor(task.status),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        <Typography variant="h6">{task.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          Created: {new Date(task.created_at).toLocaleDateString()}
        </Typography>
      </Box>
      <Select
        value={task.status}
        onChange={handleStatusChange}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
    </Paper>
  );
};

export default TaskItem;
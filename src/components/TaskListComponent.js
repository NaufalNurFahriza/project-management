import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';

const TaskListComponent = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://test-fe.sidak.co.id/api/projects/${projectId}/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  if (loading) return <CircularProgress sx={{ margin: 4 }} />;
  if (error) return <Alert severity="error" sx={{ margin: 4 }}>{error}</Alert>;

  return (
    <Card sx={{ margin: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Project Tasks
        </Typography>
        <Stack spacing={2}>
          {tasks.length === 0 ? (
            <Typography color="text.secondary">
              No tasks found for this project.
            </Typography>
          ) : (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onTaskUpdated={handleTaskUpdated}
              />
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskListComponent
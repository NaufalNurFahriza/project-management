import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../utils/api/apiProvider';
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
  
    useEffect(() => {
      fetchTasks(projectId)
        .then((data) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch tasks');
          setLoading(false);
        });
    }, [projectId]);
  
    const handleTaskUpdated = () => {
      fetchTasks(projectId)
        .then((data) => setTasks(data))
        .catch((err) => setError('Failed to fetch tasks'));
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
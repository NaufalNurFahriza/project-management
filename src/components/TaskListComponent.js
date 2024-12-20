import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

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

  if (loading) return <div className="p-4">Loading tasks...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md m-4 p-6">
      <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found for this project.</p>
        ) : (
          tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskUpdated={handleTaskUpdated}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListComponent;
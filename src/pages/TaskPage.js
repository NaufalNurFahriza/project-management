import React from 'react';
import { useParams } from 'react-router-dom';
import TaskListComponent from '../components/TaskListComponent';
import AddTaskForm from '../components/AddTaskForm';

const Task = () => {
  const { projectId } = useParams();

  const handleTaskAdded = () => {
    // Force TaskListComponent to refresh
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Tasks</h1>
      <AddTaskForm projectId={projectId} onTaskAdded={handleTaskAdded} />
      <TaskListComponent projectId={projectId} />
    </div>
  );
};

export default Task;
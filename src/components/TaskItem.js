import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onTaskUpdated }) => {
  const statusColors = {
    'To Do': 'bg-gray-100',
    'In Progress': 'bg-blue-100',
    'Completed': 'bg-green-100'
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
    <div className={`p-4 rounded-lg ${statusColors[task.status]} flex justify-between items-center`}>
      <div>
        <h3 className="font-medium">{task.name}</h3>
        <p className="text-sm text-gray-600">
          Created: {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="p-2 border rounded bg-white"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskItem;
import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-2xl mx-auto my-4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </form>
      {status.message && (
        <div className={`mt-4 p-3 rounded ${
          status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
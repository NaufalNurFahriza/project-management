import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post('https://test-fe.sidak.co.id/api/projects', formData);
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
    <div className="max-w-2xl mx-auto my-4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Project
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

export default AddProjectForm;
// apiProvider.js
import axios from 'axios';

const API_BASE_URL = 'https://test-fe.sidak.co.id/api';

// Helper function to handle API calls with error handling
const apiCall = async (url, method = 'GET', data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch data');
  }
};

// Define specific API functions

// Create a project, expects an object with name and description
export const createProject = (formData) => {
    return apiCall('/projects', 'POST', {
      name: formData.name,
      description: formData.description,
    });
  };
  
  // Create a task, expects an object with name and status
  export const createTask = (projectId, formData) => {
    return apiCall(`/projects/${projectId}/tasks`, 'POST', {
      name: formData.name,
      status: formData.status || 'To Do', // default status to 'To Do' if not provided
    });
  };
  
  // Fetch all projects
  export const fetchProjects = () => apiCall('/projects');
  
  // Fetch tasks for a specific project
  export const fetchTasks = (projectId) => apiCall(`/projects/${projectId}/tasks`);
  
  // Update task status
  export const updateTaskStatus = (taskId, newStatus) => {
    return apiCall(`/tasks/${taskId}`, 'PUT', { status: newStatus });
  };
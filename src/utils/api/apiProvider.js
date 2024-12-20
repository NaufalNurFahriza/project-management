import axios from 'axios';

const API_BASE_URL = 'https://test-fe.sidak.co.id/api';

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

export const createProject = (formData) => {
    return apiCall('/projects', 'POST', {
      name: formData.name,
      description: formData.description,
    });
  };
  
  export const createTask = (projectId, formData) => {
    return apiCall(`/projects/${projectId}/tasks`, 'POST', {
      name: formData.name,
      status: formData.status || 'To Do',
    });
  };
  
  export const fetchProjects = () => apiCall('/projects');
  
  export const fetchTasks = (projectId) => apiCall(`/projects/${projectId}/tasks`);
  
  export const updateTaskStatus = (taskId, newStatus) => {
    return apiCall(`/tasks/${taskId}`, 'PUT', { status: newStatus });
  };
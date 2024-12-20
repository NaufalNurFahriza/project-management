import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectListComponent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://test-fe.sidak.co.id/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading projects...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid gap-4 p-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{project.name}</h3>
            <Link 
              to={`/tasks/${project.id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Tasks
            </Link>
          </div>
          <p className="text-gray-600">{project.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            Created: {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectListComponent;
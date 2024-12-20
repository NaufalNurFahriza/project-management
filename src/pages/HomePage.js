import React from 'react';
import ProjectListComponent from '../components/ProjectListComponent';
import AddProjectForm from '../components/AddProjectForm';

const Home = () => {
  const handleProjectAdded = () => {
    // Force ProjectListComponent to refresh
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>
      <AddProjectForm onProjectAdded={handleProjectAdded} />
      <ProjectListComponent />
    </div>
  );
};

export default Home;
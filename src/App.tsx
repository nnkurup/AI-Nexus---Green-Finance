import React from 'react';
import { Dashboard } from './components/Dashboard';
import { mockProjects } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard projects={mockProjects} />
    </div>
  );
}

export default App;
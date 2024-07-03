import React from 'react';
import Table from './components/Table';

const App: React.FC = () => {
  return (
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Movie List</h1>
        <div className="bg-white shadow-md rounded my-6">
          <Table />
        </div>
      </div>
  );
};

export default App;

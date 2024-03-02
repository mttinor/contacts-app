import React from 'react';
import withLayout from '../components/withLayout';

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Home Page</h1>
    </div>
  );
};

export default withLayout(Home);
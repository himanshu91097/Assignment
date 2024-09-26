import React from 'react';
import '../App.css';

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
      <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>Pending</button>
    </div>
  );
};

export default Filter;

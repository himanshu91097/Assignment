import React, { useState } from 'react';
import '../App.css';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add new task..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTodo;

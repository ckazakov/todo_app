import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <h1>Мой словарь</h1>
      <h2>{toDo} осталось выучить, {done} выучено</h2>
    </div>
  );
};

export default AppHeader;

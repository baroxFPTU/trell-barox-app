import React from 'react';
import './Task.scss';

function Task(props) {
  return (
    <li>
      <img src={'https://source.unsplash.com/random'} alt="" />
      This is a task
    </li>
  );
}

export default Task;
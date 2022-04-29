import Task from 'components/Task/Task';
import React from 'react';
import './Column.scss';

function Column(props) {
  return (
    <div className="column">
    <header>This is header</header>
    <ul>
      <Task/>
      <Task/>

    </ul>
    <footer>
      Add another task
    </footer>
  </div>
  );
}

export default Column;
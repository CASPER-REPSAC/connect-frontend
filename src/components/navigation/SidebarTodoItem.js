import React from 'react';
import { Link } from 'react-router-dom';

function SidebarTodoItem({ activity }) {
  const { title, description, id, type } = activity;
  return (
    <Link
      to={`/activities/${id}`}
      className="sidebar-todo-item"
      title={description}
    >
      <div className="title text-truncate">{title ? title : 'no title'}</div>
      <div className="sub-title">{type ? type : 'no type'}</div>
    </Link>
  );
}

export default SidebarTodoItem;

import React from 'react';

function SidebarTodoItem({ to, title, subTitle }) {
  return (
    <div className="sidebar-todo-item">
      <input type="checkbox" name="" id="" className="checkbox dragable" />
      <div className="title">{title ? title : 'no title'}</div>
      <div className="sub-title">{subTitle ? subTitle : 'no subTitle'}</div>
    </div>
  );
}

export default SidebarTodoItem;

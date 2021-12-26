import React from 'react';
import SidebarTodoItem from './SidebarTodoItem';
import Button from '../common/Button';

const SidebarTodos = ({ userContainedActivity }) => {
  return (
    <div className="sidebar-todos mt-3 p-3">
      {userContainedActivity &&
      Array.isArray(userContainedActivity) &&
      userContainedActivity.length > 0 ? (
        <div className="title font-700 mb-1">참여 중인 액티비티</div>
      ) : (
        <div className="title">액티비티에 참가해보세요!</div>
      )}
      {userContainedActivity &&
        Array.isArray(userContainedActivity) &&
        userContainedActivity.length > 0 && (
          <>
            {userContainedActivity.map((activity, index) => (
              <SidebarTodoItem key={index} activity={activity} />
            ))}
          </>
        )}
    </div>
  );
};

export default SidebarTodos;

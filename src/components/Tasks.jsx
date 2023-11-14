import React, { useState } from 'react';
import '../css/Tasks.css';
import SideBar from '../components/SideBar';

function Tasks() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <SideBar isCollapsed={isSidebarCollapsed} onCollapse={handleSidebarCollapse} />
      <div className={`Tasks ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="TasksCont">
          {/* Your task content */}
        </div>
      </div>
    </>
  );
}

export default Tasks;

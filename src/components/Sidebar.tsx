import { CloseIcon } from '@/Icons/CloseIcon';
import { OpenIcon } from '@/Icons/OpenIcon';
import React from 'react';

interface SidebarProps {
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
}

const Sidebar = ({
    children,
    onClick,
    isActive
}: SidebarProps) => {
 

  return (
    <div
      className={`p-4 z-[100] mt-[88px] opacity-95 fixed left-0 top-0 h-screen text-white transition-all duration-300 ease-in-out ${
        isActive ? 'w-[30%] border-r-4 border-[#004CFF] bg-[#F7F9FF]' : 'w-5 bg-[#004CFF]'
      }`}
    >
      <button
        onClick={onClick}
        className="absolute -right-5 top-4 bg-[#F7F9FF] text-white p-2 rounded-full focus:outline-none border-2 border-[#004CFF]"
        aria-label={isActive ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isActive ? <CloseIcon /> : <OpenIcon />}
      </button>
      <div
      className={`transition-transform duration-500 ease-in-out ${
        isActive ? 'translate-x-0' : '-translate-x-[500px]'
      }`}
    >
      {
        isActive &&
        <nav>
          <ul className="flex flex-col py-4 space-y-4">
            {children}
          </ul>
        </nav>
      }
      </div>
    </div>
  );
};

export default Sidebar;
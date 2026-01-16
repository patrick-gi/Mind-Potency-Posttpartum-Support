
import React from 'react';
import { View } from '../types';
import { MessageSquareIcon, JournalIcon, SunIcon, StethoscopeIcon, UserCircleIcon } from './icons/Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 ${
      isActive ? 'bg-white shadow-sm text-[#7C5E4A]' : 'text-[#9D8B80] hover:bg-[#F0EBE6]'
    }`}
  >
    {icon}
    <span className="ml-4 font-semibold">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: View.Chat, icon: <MessageSquareIcon className="w-6 h-6" />, label: 'Chat' },
    { view: View.Journal, icon: <JournalIcon className="w-6 h-6" />, label: 'Journal' },
    { view: View.Trackers, icon: <SunIcon className="w-6 h-6" />, label: 'Trackers' },
    { view: View.Resources, icon: <StethoscopeIcon className="w-6 h-6" />, label: 'Resources' },
    { view: View.Profile, icon: <UserCircleIcon className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <aside className="w-64 bg-[#EAE2D8] p-4 flex-col hidden md:flex">
      <div className="flex items-center mb-10">
        <img
          src="https://source.unsplash.com/150x150/?woman,portrait"
          alt="User"
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="font-bold text-lg text-[#5B4F47]">Welcome</h2>
          <p className="text-sm text-[#9D8B80]">Registered User</p>
        </div>
      </div>
      <nav>
        {navItems.map(item => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.view}
            onClick={() => setCurrentView(item.view)}
          />
        ))}
      </nav>
      <div className="mt-auto text-center text-xs text-[#9D8B80]">
        <p>Built by Patrick Himwiita</p>
        <p className="mt-2">This is a paid application for registered users.</p>
      </div>
    </aside>
  );
};

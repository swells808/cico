
import React from "react";
import { Link } from "react-router-dom";
import { User, Clock, BarChart, FolderOpen, FileText, Settings } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const UserHeader: React.FC = () => {
  return (
    <header className="fixed w-full bg-white border-b border-gray-100 shadow-sm z-50 top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <nav className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">Dashboard</Link>
            <Link to="/timeclock" className="text-gray-600 hover:text-[#4BA0F4]">Clock</Link>
            <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">Time Tracking</Link>
            <Link to="/projects" className="text-gray-600 hover:text-[#4BA0F4]">Projects</Link>
            <Link to="/reports" className="text-gray-600 hover:text-[#4BA0F4]">Reports</Link>
            <Link to="/users" className="text-[#008000] font-medium">Users</Link>
            <Link to="/settings" className="text-gray-600 hover:text-[#4BA0F4]">Settings</Link>
          </nav>
          <div className="flex items-center">
            <button className="flex items-center space-x-2">
              <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

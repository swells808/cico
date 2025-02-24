
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  CircleDot
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for demonstration
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    team: [
      { id: 1, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" },
      { id: 2, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" },
      { id: 3, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" },
    ],
    status: "In Progress",
    hours: "45h",
    deadline: "Dec 25, 2025"
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">
                <i className="fa-solid fa-gauge-high mr-2" />Dashboard
              </Link>
              <Link to="/clock" className="text-gray-500 hover:text-gray-900">
                <i className="fa-regular fa-clock mr-2" />Clock
              </Link>
              <Link to="/time-tracking" className="text-gray-500 hover:text-gray-900">
                <i className="fa-solid fa-chart-line mr-2" />Time Tracking
              </Link>
              <span className="text-[#4BA0F4]">
                <i className="fa-solid fa-folder mr-2" />Projects
              </span>
              <Link to="/reports" className="text-gray-500 hover:text-gray-900">
                <i className="fa-solid fa-file-lines mr-2" />Reports
              </Link>
              <Link to="/settings" className="text-gray-500 hover:text-gray-900">
                <i className="fa-solid fa-gear mr-2" />Settings
              </Link>
            </nav>
            <div className="flex items-center">
              <button className="relative">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Project Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Projects</h3>
                <span className="text-2xl font-bold text-[#008000]">24</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Completed Projects</h3>
                <span className="text-2xl font-bold text-[#4BA0F4]">156</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Pending Tasks</h3>
                <span className="text-2xl font-bold text-orange-500">12</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project List */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">Projects</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full md:w-64 pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <Button className="bg-[#008000] hover:bg-[#006400] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-4">Project Name</th>
                    <th className="text-left py-4 px-4">Team</th>
                    <th className="text-left py-4 px-4">Status</th>
                    <th className="text-left py-4 px-4">Hours</th>
                    <th className="text-left py-4 px-4">Deadline</th>
                    <th className="text-left py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {project.name}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex -space-x-2">
                          {project.team.map((member) => (
                            <img
                              key={member.id}
                              src={member.avatar}
                              alt="Team member"
                              className="w-8 h-8 rounded-full border-2 border-white"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">{project.hours}</td>
                      <td className="py-4 px-4">{project.deadline}</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 CICO Timeclock. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/support" className="text-sm text-gray-500 hover:text-gray-700">
                Support
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;

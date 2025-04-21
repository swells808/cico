import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Settings,
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal,
  LayoutGrid,
  List,
  ArrowDownAZ,
  ArrowUpZA
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

// Move projects data to the top level
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
    deadline: "Dec 25, 2025",
    description: "Redesigning the company website with a modern UI/UX approach",
    tasks: 24,
    completedTasks: 12
  },
  {
    id: 2,
    name: "Mobile App Development",
    team: [
      { id: 2, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" },
      { id: 4, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" },
    ],
    status: "Active",
    hours: "120h",
    deadline: "Jan 15, 2026",
    description: "Building native mobile applications for iOS and Android platforms",
    tasks: 36,
    completedTasks: 8
  },
  {
    id: 3,
    name: "Content Marketing Campaign",
    team: [
      { id: 1, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" },
      { id: 5, avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg" },
    ],
    status: "Completed",
    hours: "80h",
    deadline: "Nov 30, 2025",
    description: "Planning and executing quarterly content marketing strategy",
    tasks: 18,
    completedTasks: 18
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"status" | "hours" | "deadline">("status");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Enhanced filter and sort projects
  const filteredProjects = projects
    .filter(project => 
      (statusFilter === "all" || project.status === statusFilter) &&
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        switch (sortField) {
          case "hours":
            return parseInt(a.hours) - parseInt(b.hours);
          case "deadline":
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          default:
            return a.status.localeCompare(b.status);
        }
      }
      switch (sortField) {
        case "hours":
          return parseInt(b.hours) - parseInt(a.hours);
        case "deadline":
          return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
        default:
          return b.status.localeCompare(a.status);
      }
    });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">Dashboard</Link>
              <Link to="/timeclock" className="text-gray-600 hover:text-[#4BA0F4]">Clock</Link>
              <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">Time Tracking</Link>
              <Link to="/projects" className="text-[#4BA0F4]">Projects</Link>
              <Link to="/reports" className="text-gray-600 hover:text-[#4BA0F4]">Reports</Link>
              <Link to="/users" className="text-gray-600 hover:text-[#4BA0F4]">Users</Link>
            </nav>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                {/* Status Filter */}
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Field Select */}
                <Select
                  value={sortField}
                  onValueChange={(value: "status" | "hours" | "deadline") => setSortField(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Order Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                  className="w-10 h-10"
                >
                  {sortOrder === "asc" ? (
                    <ArrowDownAZ className="h-4 w-4" />
                  ) : (
                    <ArrowUpZA className="h-4 w-4" />
                  )}
                </Button>

                {/* Existing Search and View Toggle */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full md:w-64 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={viewMode === "list" ? "bg-gray-100" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={viewMode === "grid" ? "bg-gray-100" : ""}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="bg-[#008000] hover:bg-[#006400] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            {/* List View */}
            {viewMode === "list" && (
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
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            project.status === "In Progress" ? "bg-green-100 text-green-800" :
                            project.status === "Completed" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">{project.hours}</td>
                        <td className="py-4 px-4">{project.deadline}</td>
                        <td className="py-4 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Project</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        project.status === "In Progress" ? "bg-green-100 text-green-800" :
                        project.status === "Completed" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">Tasks: {project.completedTasks}/{project.tasks}</span>
                      <span className="text-gray-600">Hours: {project.hours}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {project.team.map((member) => (
                          <img
                            key={member.id}
                            src={member.avatar}
                            alt="Team member"
                            className="w-7 h-7 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{project.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No projects found matching your search</p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear search
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-50">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </nav>
              </div>
            )}
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

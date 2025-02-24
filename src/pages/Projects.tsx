
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  AlertCircle,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  FileText,
  Download,
  BarChart3,
  HomeIcon, // Changed from Home to HomeIcon
  LogOutIcon // Changed from LogOut to LogOutIcon
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for demonstration
const projects = [
  {
    id: 1,
    name: "Website Redesign",
    team: ["John D.", "Sarah M.", "Mike R."],
    status: "In Progress",
    hoursLogged: 45,
    deadline: "2024-04-15",
    progress: 65,
    client: "TechCorp Inc.",
  },
  {
    id: 2,
    name: "Mobile App Development",
    team: ["Alex K.", "Emma S."],
    status: "Not Started",
    hoursLogged: 0,
    deadline: "2024-05-01",
    progress: 0,
    client: "StartupX",
  },
  {
    id: 3,
    name: "Data Migration",
    team: ["Robert L.", "Lisa M."],
    status: "Completed",
    hoursLogged: 120,
    deadline: "2024-03-01",
    progress: 100,
    client: "Enterprise Solutions",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "not started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed w-full bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">Dashboard</Link>
              <Link to="/clock" className="text-gray-600 hover:text-[#4BA0F4]">Clock</Link>
              <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">Time Tracking</Link>
              <span className="text-[#008000] font-medium">Projects</span>
              <Link to="/reports" className="text-gray-600 hover:text-[#4BA0F4]">Reports</Link>
              <Link to="/users" className="text-gray-600 hover:text-[#4BA0F4]">Users</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="flex items-center gap-2">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <FileText className="text-gray-400 w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{projects.length}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <CheckCircle className="text-gray-400 w-5 h-5" />
                <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                  {projects.filter(p => p.status === "Completed").length} Done
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {projects.filter(p => p.status === "In Progress").length}
              </div>
              <div className="text-sm text-gray-500">Active Projects</div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <AlertCircle className="text-gray-400 w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-800">5</div>
              <div className="text-sm text-gray-500">Pending Tasks</div>
            </Card>
          </div>

          {/* Project Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-[#008000] hover:bg-[#008000]/90 text-white w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Project List */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Project Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Team</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Hours</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Deadline</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.client}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {project.team.map((member, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                              title={member}
                            >
                              {member.split(" ")[0][0]}
                              {member.split(" ")[1][0]}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{project.hoursLogged}h</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full">
                          <Progress value={project.progress} className="h-2" />
                          <span className="text-sm text-gray-500">{project.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex space-x-6">
              <Link to="/dashboard">
                <HomeIcon className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
              </Link>
              <Clock className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
              <FileText className="text-[#008000] w-5 h-5" />
              <BarChart3 className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
            </div>
            <LogOutIcon className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;

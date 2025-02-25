
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  ChevronDown,
  Users as UsersIcon,
  Settings2 as Settings,
  Search,
  Plus,
  MoreVertical
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { AddUserModal } from "@/components/users/AddUserModal";

const Users = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const refreshUsers = () => {
    // TODO: Implement refresh logic when we add the users list
    console.log("Refreshing users list...");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">Dashboard</Link>
              <Link to="/timeclock" className="text-gray-600 hover:text-[#4BA0F4]">Clock</Link>
              <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">Time Tracking</Link>
              <Link to="/projects" className="text-gray-600 hover:text-[#4BA0F4]">Projects</Link>
              <Link to="/reports" className="text-gray-600 hover:text-[#4BA0F4]">Reports</Link>
              <Link to="/users" className="text-[#4BA0F4]">Users</Link>
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">User Management</h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Active Users</CardTitle>
                  <UsersIcon className="w-5 h-5 text-[#4BA0F4]" />
                </div>
                <p className="text-3xl font-bold mt-2">247</p>
                <p className="text-sm text-gray-500">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Pending Approvals</CardTitle>
                  <Search className="w-5 h-5 text-[#4BA0F4]" />
                </div>
                <p className="text-3xl font-bold mt-2">8</p>
                <p className="text-sm text-gray-500">Role changes waiting</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">New Users</CardTitle>
                  <Plus className="w-5 h-5 text-[#4BA0F4]" />
                </div>
                <p className="text-3xl font-bold mt-2">15</p>
                <p className="text-sm text-gray-500">Added this week</p>
              </CardContent>
            </Card>
          </div>

          {/* User List */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4BA0F4] w-64"
                    />
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  </div>
                  <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4BA0F4]">
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Employee</option>
                  </select>
                </div>
                <AddUserModal onSuccess={refreshUsers} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">User</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                            alt="Sarah Wilson"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-medium">Sarah Wilson</div>
                            <div className="text-sm text-gray-500">sarah.w@company.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">Manager</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">2 minutes ago</td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-sm text-gray-500">
              <Link to="/support" className="hover:text-gray-700">Support</Link>
              <Link to="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gray-700">Terms</Link>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 CICO Timeclock
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Users;

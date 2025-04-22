import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download,
  Clock,
  FolderOpen,
  LineChart,
  ArrowUp,
  ChevronDown,
  Settings,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { ReportFilters } from "@/components/reports/ReportFilters";

const Reports = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4]">
                Dashboard
              </Link>
              <Link to="/clock" className="text-gray-600 hover:text-[#4BA0F4]">
                Clock
              </Link>
              <Link to="/time-tracking" className="text-gray-600 hover:text-[#4BA0F4]">
                Time Tracking
              </Link>
              <Link to="/projects" className="text-gray-600 hover:text-[#4BA0F4]">
                Projects
              </Link>
              <span className="text-[#4BA0F4]">
                Reports
              </span>
              <Link to="/users" className="text-gray-600 hover:text-[#4BA0F4]">
                Users
              </Link>
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
        {/* Reports Header */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#4BA0F4] hover:bg-[#4BA0F4]/90 text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Report Filters */}
          <ReportFilters />

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-500">Total Hours</div>
                <Clock className="text-[#008000]" />
              </div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-green-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 12% vs last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-500">Active Projects</div>
                <FolderOpen className="text-[#4BA0F4]" />
              </div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-blue-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 3 new this week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="text-gray-500">Overtime Hours</div>
                <Clock className="text-orange-500" />
              </div>
              <div className="text-2xl font-bold">11</div>
              <div className="text-sm text-orange-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 2 hours vs last month
              </div>
            </div>
          </div>
        </section>

        {/* Report Content */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-100">
            <div className="flex space-x-6 px-6">
              <button className="px-4 py-4 text-[#4BA0F4] border-b-2 border-[#4BA0F4] font-semibold">
                Metrics
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Work Hours Per Employee Table */}
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-auto">
                <div className="font-semibold text-gray-700 mb-2">Work Hours Per Employee</div>
                <table className="min-w-full text-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="py-2 px-3 text-left text-gray-500">Name</th>
                      <th className="py-2 px-3 text-left text-gray-500">Week</th>
                      <th className="py-2 px-3 text-left text-gray-500">Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Jane Doe", week: 42, month: 172 },
                      { name: "Alex Lee", week: 39, month: 165 },
                      { name: "John Smith", week: 36, month: 159 },
                      { name: "Taylor Morgan", week: 27, month: 143 },
                      { name: "Chris Evans", week: 20, month: 128 },
                    ].map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="py-2 px-3">{row.name}</td>
                        <td className="py-2 px-3">{row.week}</td>
                        <td className="py-2 px-3">{row.month}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Project Time Distribution Table */}
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-auto">
                <div className="font-semibold text-gray-700 mb-2">Project Time Distribution</div>
                <table className="min-w-full text-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="py-2 px-3 text-left text-gray-500">Project Name</th>
                      <th className="py-2 px-3 text-left text-gray-500">Week</th>
                      <th className="py-2 px-3 text-left text-gray-500">Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Redesign Q3", week: 41, month: 160 },
                      { name: "Project Alpha", week: 37, month: 149 },
                      { name: "Mobile App", week: 31, month: 137 },
                      { name: "New Onboarding", week: 24, month: 111 },
                      { name: "Remote HR", week: 15, month: 97 },
                    ].map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="py-2 px-3">{row.name}</td>
                        <td className="py-2 px-3">{row.week}</td>
                        <td className="py-2 px-3">{row.month}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F6F6F7] border-t border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-[#8E9196] flex items-center gap-2">
              <span>© 2025 CICO Timeclock. All rights reserved.</span>
            </div>
            <div className="flex space-x-8 text-sm text-[#8E9196] font-medium">
              <a href="/support" className="hover:text-gray-800">Support</a>
              <a href="/privacy" className="hover:text-gray-800">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-800">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Reports;

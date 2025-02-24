
import React from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Clock,
  FolderOpen,
  LineChart,
  ArrowUp,
  ChevronDown,
  Calendar
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";

const Reports = () => {
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
              <Link to="/settings" className="text-gray-600 hover:text-[#4BA0F4]">
                Settings
              </Link>
            </nav>
            <div className="relative">
              <button className="flex items-center space-x-2">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Reports Header */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button className="bg-[#4BA0F4] hover:bg-[#4BA0F4]/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

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
                <div className="text-gray-500">Team Performance</div>
                <LineChart className="text-purple-500" />
              </div>
              <div className="text-2xl font-bold">92%</div>
              <div className="text-sm text-purple-600 mt-2 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> 5% increase
              </div>
            </div>
          </div>
        </section>

        {/* Report Content */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-100">
            <div className="flex space-x-6 px-6">
              <button className="px-4 py-4 text-[#4BA0F4] border-b-2 border-[#4BA0F4]">
                Employee Reports
              </button>
              <button className="px-4 py-4 text-gray-500 hover:text-gray-700">
                Project Reports
              </button>
              <button className="px-4 py-4 text-gray-500 hover:text-gray-700">
                Payroll Reports
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] flex items-center justify-center">
                Work Hours Per Employee Chart
              </div>
              <div className="bg-gray-50 rounded-lg p-4 h-[300px] flex items-center justify-center">
                Project Time Distribution Chart
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-sm text-gray-500">
              <Link to="/support" className="hover:text-gray-700">
                Support
              </Link>
              <Link to="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gray-700">
                Terms
              </Link>
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

export default Reports;

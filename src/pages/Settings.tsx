
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  ChevronDown,
  Users,
  Settings as SettingsIcon
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
              <Link to="/reports" className="text-gray-600 hover:text-[#4BA0F4]">
                Reports
              </Link>
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
                  <DropdownMenuItem className="cursor-pointer text-[#4BA0F4]">
                    <SettingsIcon className="w-4 h-4 mr-2" />
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Settings</h1>
          
          {/* Profile Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <Button>Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          {/* Password Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive email updates about your activity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4BA0F4]"></div>
                  </label>
                </div>
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

export default Settings;

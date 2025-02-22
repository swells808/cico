
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Folder, RotateCcw, User, Coffee, StickyNote, LogOut, Home, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Logo } from "@/components/ui/Logo";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed w-full bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <span className="text-[#008000] font-medium cursor-pointer">Dashboard</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Clock</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Time Tracking</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Projects</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Reports</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Users</span>
            </nav>
            <div className="flex items-center">
              <button className="flex items-center space-x-2">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome & Stats */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Good Morning, John</h1>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <span className="text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                  <span className="text-sm font-medium">Currently On Shift</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Clock className="text-gray-400 w-5 h-5" />
                  <span className="text-[#4BA0F4] text-sm font-medium">Today</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">7h 22m</div>
                <div className="text-sm text-gray-500">Hours Worked</div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Folder className="text-gray-400 w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-800">4</div>
                <div className="text-sm text-gray-500">Active Projects</div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <RotateCcw className="text-gray-400 w-5 h-5" />
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs font-medium">3 Pending</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-500">Time Approvals</div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <User className="text-gray-400 w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-[#008000]">Active</div>
                <div className="text-sm text-gray-500">Current Status</div>
              </Card>
            </div>
          </section>

          {/* Clock Activity */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="text-xl font-bold mb-2">{format(currentTime, "hh:mm:ss aa")}</div>
                  <div className="text-sm text-gray-500">{format(currentTime, "MMMM dd, yyyy")}</div>
                </div>

                <Select>
                  <SelectTrigger className="w-full mb-4">
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Projects</SelectLabel>
                      <SelectItem value="website">Website Redesign</SelectItem>
                      <SelectItem value="mobile">Mobile App Development</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button className="w-full bg-[#008000] hover:bg-[#008000]/90 text-white mb-4">
                  Clock Out
                </Button>

                <div className="flex gap-2 mb-4">
                  <Button variant="destructive" size="sm" className="flex-1 h-9 text-xs">
                    <Coffee className="mr-1 h-3 w-3" />
                    Start Break
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1 h-9 text-xs">
                    <StickyNote className="mr-1 h-3 w-3" />
                    Add Note
                  </Button>
                </div>

                <div className="text-sm text-gray-500 text-center">
                  Last clock-in: 8:00 AM
                </div>
              </Card>
            </div>

            {/* Activity Feed */}
            <div className="md:col-span-2">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
                  <Button variant="link" className="text-[#4BA0F4]">View All</Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <LogOut className="text-[#4BA0F4] w-5 h-5" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Clock In</div>
                          <div className="text-sm text-gray-500">Website Redesign Project</div>
                        </div>
                        <div className="text-sm text-gray-500">8:00 AM</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Coffee className="text-orange-500 w-5 h-5" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Break Started</div>
                          <div className="text-sm text-gray-500">30 minutes</div>
                        </div>
                        <div className="text-sm text-gray-500">10:30 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex space-x-6">
              <Home className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
              <Clock className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
              <Folder className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
              <BarChart3 className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
            </div>
            <LogOut className="text-gray-600 hover:text-[#008000] cursor-pointer w-5 h-5" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

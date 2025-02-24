import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Clock, 
  MapPin,
  Coffee,
  Download,
  FileText,
  LogOut,
  ChevronDown,
  Edit2,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  Plus,
  StickyNote
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInMinutes } from "date-fns";
import { Logo } from "@/components/ui/Logo";

const TimeTracking = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's location automatically
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error("Error getting location:", error)
      );
    }

    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    if (!isClockedIn && !selectedProject) {
      alert("Please select a project before clocking in.");
      return;
    }
    setIsClockedIn(!isClockedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed w-full bg-white border-b border-gray-100 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Dashboard</Link>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Clock</span>
              <span className="text-[#008000] font-medium cursor-pointer">Time Tracking</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Projects</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Reports</span>
              <span className="text-gray-600 hover:text-[#4BA0F4] cursor-pointer">Users</span>
            </nav>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button variant="ghost" className="flex items-center gap-2">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Current Status Section */}
          <Card className="mb-8 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {isClockedIn ? "Currently Working" : "Not Clocked In"}
                </h2>
                <p className="text-gray-600">
                  {isClockedIn ? `Clocked in at ${format(currentTime, "h:mm a")}` : "Ready to start work?"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {location && (
                  <span className="flex items-center text-green-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location Verified
                  </span>
                )}
                {isClockedIn && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Clock In/Out Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="md:col-span-1 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">{format(currentTime, "h:mm:ss a")}</div>
                <div className="text-gray-500">{format(currentTime, "EEEE, MMMM d, yyyy")}</div>
              </div>

              <Select value={selectedProject} onValueChange={setSelectedProject}>
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

              <Button 
                className={`w-full h-14 text-lg mb-4 ${isClockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-[#008000] hover:bg-[#008000]/90'}`}
                onClick={handleClockInOut}
              >
                {isClockedIn ? "Clock Out" : "Clock In"}
              </Button>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setIsOnBreak(!isOnBreak)}
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  {isOnBreak ? "End Break" : "Start Break"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 h-9 text-xs"
                >
                  <StickyNote className="mr-1 h-3 w-3" />
                  Add Note
                </Button>
              </div>
            </Card>

            {/* Live Time Log */}
            <Card className="md:col-span-2 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Today's Activity</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Current Session */}
                {isClockedIn && (
                  <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-100 rounded-lg">
                    <PlayCircle className="text-green-600 w-5 h-5 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-600">Website Redesign Project</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Started at {format(currentTime, "h:mm a")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Previous Sessions */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Morning Session</div>
                        <div className="text-sm text-gray-600">Mobile App Development</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        8:00 AM - 12:00 PM (4h)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <PauseCircle className="text-orange-500 w-5 h-5 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Break</div>
                        <div className="text-sm text-gray-600">Lunch Break</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        12:00 PM - 1:00 PM (1h)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Timesheet History */}
          <Card className="mb-8 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Timesheet History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Timesheet
              </Button>
            </div>

            <div className="space-y-4">
              {/* Date Headers */}
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 mb-2">
                <div>Date</div>
                <div>Project</div>
                <div>Clock In</div>
                <div>Clock Out</div>
                <div>Total Hours</div>
              </div>

              {/* Timesheet Entries */}
              <div className="grid grid-cols-5 gap-4 text-sm border-b border-gray-100 pb-4">
                <div>Mar 14, 2024</div>
                <div>Website Redesign</div>
                <div>9:00 AM</div>
                <div>5:00 PM</div>
                <div>8h</div>
              </div>

              <div className="grid grid-cols-5 gap-4 text-sm border-b border-gray-100 pb-4">
                <div>Mar 13, 2024</div>
                <div>Mobile App</div>
                <div>8:30 AM</div>
                <div>4:30 PM</div>
                <div>8h</div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-[#008000]">Support</a>
              <a href="#" className="hover:text-[#008000]">Privacy Policy</a>
              <a href="#" className="hover:text-[#008000]">Terms</a>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#008000]">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TimeTracking;

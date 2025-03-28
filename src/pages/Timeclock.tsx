
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Square, Coffee, X, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Timeclock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [pin, setPin] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Project data for the dropdown
  const projects = [
    { id: "1", name: "Project A" },
    { id: "2", name: "Project B" },
    { id: "3", name: "Project C" },
    { id: "4", name: "Project D" },
    { id: "5", name: "Project E" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Toggle project selection
  const toggleProject = (projectId: string) => {
    setSelectedProjects(current => 
      current.includes(projectId)
        ? current.filter(id => id !== projectId)
        : [...current, projectId]
    );
  };

  // Get project names for display
  const getSelectedProjectNames = () => {
    return selectedProjects
      .map(id => projects.find(p => p.id === id)?.name)
      .filter(Boolean);
  };

  const isActionEnabled = selectedEmployee && pin.length >= 4 && selectedProjects.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="w-full flex justify-center">
          <div className="flex items-center">
            <Clock className="text-[#4BA0F4] w-6 h-6 mr-2" />
            <span className="text-xl font-semibold">CICO Timeclock</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <Card className="p-8 mb-6">
            <div className="text-6xl font-bold text-gray-800 mb-4">
              {formatTime(currentTime)}
            </div>
            <div className="text-xl text-gray-600 mb-6">
              {formatDate(currentTime)}
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline">English</Button>
              <Button variant="outline">Español</Button>
              <Button variant="outline">Français</Button>
            </div>
          </Card>
        </section>

        <section className="max-w-md mx-auto">
          <Card className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Select Employee</h2>
              <p className="text-gray-600">Please select your name and enter PIN</p>
            </div>

            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">John Doe</SelectItem>
                  <SelectItem value="2">Jane Smith</SelectItem>
                  <SelectItem value="3">Mike Johnson</SelectItem>
                  <SelectItem value="4">Sarah Williams</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={10}
              className="mb-6"
            />

            {/* Multi-select dropdown for projects */}
            <div className="mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="truncate">
                      {selectedProjects.length === 0 
                        ? "Select Projects" 
                        : `${selectedProjects.length} Project${selectedProjects.length > 1 ? 's' : ''} Selected`}
                    </span>
                    <span className="ml-2">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-h-60 overflow-auto">
                  {projects.map((project) => (
                    <DropdownMenuCheckboxItem
                      key={project.id}
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => toggleProject(project.id)}
                    >
                      {project.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Display selected projects as badges */}
              {selectedProjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSelectedProjectNames().map((name, index) => (
                    <Badge key={index} variant="secondary">
                      {name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                disabled={!isActionEnabled}
                className="bg-[#008000] hover:bg-[#008000]/90 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Clock In
              </Button>
              <Button
                disabled={!isActionEnabled}
                variant="destructive"
              >
                <Square className="w-4 h-4 mr-2" />
                Clock Out
              </Button>
            </div>

            <Button
              disabled={!isActionEnabled}
              className="w-full bg-[#4BA0F4] hover:bg-[#4BA0F4]/90 text-white mb-6"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Break
            </Button>
          </Card>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-md mx-auto">
          <Card className="p-4">
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">
                <X className="w-4 h-4 mr-2" />
                Close Page
              </Button>
            </Link>
          </Card>
        </div>
      </footer>
    </div>
  );
};

export default Timeclock;

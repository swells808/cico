
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Stop, Coffee, X, Clock } from "lucide-react";
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

const Timeclock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [pin, setPin] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

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

  const isActionEnabled = selectedEmployee && pin.length >= 4 && selectedProject;

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

            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full mb-6">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Project A</SelectItem>
                  <SelectItem value="2">Project B</SelectItem>
                  <SelectItem value="3">Project C</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

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
                <Stop className="w-4 h-4 mr-2" />
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


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Timeclock = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("");
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
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'fr-FR', {
      hour12: true,
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

  // Remove a specific project
  const removeProject = (projectId: string) => {
    setSelectedProjects(current => current.filter(id => id !== projectId));
  };

  // Get project names for display
  const getSelectedProjectNames = () => {
    return selectedProjects
      .map(id => projects.find(p => p.id === id))
      .filter(Boolean);
  };

  // Updated to remove PIN from validation
  const isActionEnabled = selectedEmployee && selectedProjects.length > 0;

  // Format project selection text with pluralization
  const formatProjectSelection = () => {
    if (selectedProjects.length === 0) {
      return t('timeclock.selectProjects');
    }
    
    const key = selectedProjects.length === 1 
      ? 'timeclock.projectsSelected' 
      : 'timeclock.projectsSelected_plural';
    
    return t(key).replace('{count}', selectedProjects.length.toString());
  };

  const handleClosePage = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="w-full flex justify-center">
          <div className="flex items-center">
            <Clock className="text-[#4BA0F4] w-6 h-6 mr-2" />
            <span className="text-xl font-semibold">{t('timeclock.title')}</span>
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
              <Button 
                variant={language === 'en' ? 'default' : 'outline'} 
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-[#008000] text-white' : ''}
              >
                English
              </Button>
              <Button 
                variant={language === 'es' ? 'default' : 'outline'} 
                onClick={() => setLanguage('es')}
                className={language === 'es' ? 'bg-[#008000] text-white' : ''}
              >
                Español
              </Button>
              <Button 
                variant={language === 'fr' ? 'default' : 'outline'} 
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'bg-[#008000] text-white' : ''}
              >
                Français
              </Button>
            </div>
          </Card>
        </section>

        <section className="max-w-md mx-auto">
          <Card className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">{t('timeclock.selectEmployee')}</h2>
              <p className="text-gray-600">{t('timeclock.pleaseSelectAndPin')}</p>
            </div>

            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder={t('timeclock.selectEmployeeDropdown')} />
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

            {/* Pin input removed */}

            {/* Multi-select dropdown for projects */}
            <div className="mb-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="truncate">
                      {formatProjectSelection()}
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
              
              {/* Display selected projects as badges with remove icon */}
              {selectedProjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSelectedProjectNames().map((project) => project && (
                    <TooltipProvider key={project.id}>
                      <Tooltip>
                        <Badge 
                          className="flex items-center gap-1 pl-2 pr-1 py-1"
                          variant="secondary"
                        >
                          <span>{project.name}</span>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-4 w-4 rounded-full bg-gray-200 hover:bg-gray-300 p-0 ml-1"
                              onClick={() => removeProject(project.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {project.name}</span>
                            </Button>
                          </TooltipTrigger>
                        </Badge>
                        <TooltipContent>
                          <p>{t('timeclock.removeProject')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                {t('timeclock.clockIn')}
              </Button>
              <Button
                disabled={!isActionEnabled}
                variant="destructive"
              >
                <Square className="w-4 h-4 mr-2" />
                {t('timeclock.clockOut')}
              </Button>
            </div>

            <Button
              disabled={!isActionEnabled}
              className="w-full bg-[#4BA0F4] hover:bg-[#4BA0F4]/90 text-white mb-6"
            >
              <Coffee className="w-4 h-4 mr-2" />
              {t('timeclock.break')}
            </Button>
          </Card>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-md mx-auto">
          <Card className="p-4">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={handleClosePage}
            >
              <X className="w-4 h-4 mr-2" />
              {t('timeclock.closePage')}
            </Button>
          </Card>
        </div>
      </footer>
    </div>
  );
};

export default Timeclock;

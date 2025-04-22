
import React from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Play, Square, Coffee, X } from "lucide-react";

type Project = { id: string; name: string };

type TimeclockMainCardProps = {
  selectedEmployee: string;
  setSelectedEmployee: (v: string) => void;
  selectedProjects: string[];
  toggleProject: (id: string) => void;
  removeProject: (id: string) => void;
  projects: Project[];
  getSelectedProjectNames: () => (Project | undefined)[];
  isActionEnabled: boolean;
  formatProjectSelection: () => string;
  t: (key: string) => string;
};

export const TimeclockMainCard: React.FC<TimeclockMainCardProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  selectedProjects,
  toggleProject,
  removeProject,
  projects,
  getSelectedProjectNames,
  isActionEnabled,
  formatProjectSelection,
  t,
}) => (
  <section className="max-w-md mx-auto">
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("timeclock.selectEmployee")}</h2>
        <p className="text-gray-600">{t("timeclock.pleaseSelectAndPin")}</p>
      </div>

      <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder={t("timeclock.selectEmployeeDropdown")} />
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

      {/* Projects Multi-select */}
      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="truncate">{formatProjectSelection()}</span>
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
        {/* Selected Project Badges */}
        {selectedProjects.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {getSelectedProjectNames().map((project) => project && (
              <TooltipProvider key={project.id}>
                <Tooltip>
                  <Badge className="flex items-center gap-1 pl-2 pr-1 py-1" variant="secondary">
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
                    <p>{t("timeclock.removeProject")}</p>
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
          {t("timeclock.clockIn")}
        </Button>
        <Button
          disabled={!isActionEnabled}
          variant="destructive"
        >
          <Square className="w-4 h-4 mr-2" />
          {t("timeclock.clockOut")}
        </Button>
      </div>

      <Button
        disabled={!isActionEnabled}
        className="w-full bg-[#4BA0F4] hover:bg-[#4BA0F4]/90 text-white mb-6"
      >
        <Coffee className="w-4 h-4 mr-2" />
        {t("timeclock.break")}
      </Button>
    </Card>
  </section>
);

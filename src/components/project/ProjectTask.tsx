
import React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

interface Task {
  id: number;
  name: string;
  assignee: number | null;
  status: string;
  dueDate: Date;
}

interface ProjectTaskProps {
  task: Task;
  teamMembers: TeamMember[];
  statuses: string[];
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
}

export const ProjectTask: React.FC<ProjectTaskProps> = ({
  task,
  teamMembers,
  statuses,
  onUpdate,
  onRemove
}) => {
  return (
    <div className="flex items-start space-x-2 bg-gray-50 p-3 rounded-md">
      <Input
        value={task.name}
        onChange={(e) => onUpdate("name", e.target.value)}
        placeholder="Task name"
        className="flex-1"
      />
      
      <Select
        value={task.assignee?.toString() || "unassigned"}
        onValueChange={(value) => onUpdate("assignee", value === "unassigned" ? null : parseInt(value))}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {teamMembers.map((member) => (
            <SelectItem key={member.id} value={member.id.toString()}>
              <div className="flex items-center">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-5 h-5 rounded-full mr-2" 
                />
                {member.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={task.status}
        onValueChange={(value) => onUpdate("status", value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="w-40">
        <DatePicker 
          date={task.dueDate} 
          onSelect={(date) => onUpdate("dueDate", date)}
        />
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onRemove}
        className="p-0 h-9 w-9 rounded-full hover:bg-gray-200"
      >
        <X className="h-4 w-4 text-gray-500" />
      </Button>
    </div>
  );
};

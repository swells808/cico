
import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersProps {
  searchQuery: string;
  selectedRole: string;
  selectedStatus: string;
  onSearch: (query: string) => void;
  onRoleFilter: (role: string) => void;
  onStatusFilter: (status: string) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchQuery,
  selectedRole,
  selectedStatus,
  onSearch,
  onRoleFilter,
  onStatusFilter
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex-1 relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#4BA0F4] focus:border-transparent"
        />
      </div>
      
      <div className="flex gap-4 w-full md:w-auto">
        <div className="w-1/2 md:w-auto">
          <Select
            value={selectedRole}
            onValueChange={onRoleFilter}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-roles">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-1/2 md:w-auto">
          <Select
            value={selectedStatus}
            onValueChange={onStatusFilter}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="bg-[#4BA0F4] hover:bg-[#4BA0F4]/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
    </div>
  );
};

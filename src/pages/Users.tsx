
import React, { useState } from "react";
import { UserHeader } from "@/components/users/UserHeader";
import { UserStats } from "@/components/users/UserStats";
import { UserTable } from "@/components/users/UserTable";
import { UserDetailDialog } from "@/components/users/UserDetailDialog";
import { AddUserModal } from "@/components/users/AddUserModal";
import { UserFilters } from "@/components/users/UserFilters";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar?: string;
  department?: string;
  phone?: string;
  projects?: string[];
  hoursLogged?: number;
}

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all-roles");
  const [selectedStatus, setSelectedStatus] = useState<string>("all-status");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock user data - in a real app, this would come from an API
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.w@company.com",
      role: "Manager",
      status: "Active",
      lastActive: "2 minutes ago",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      projects: ["Website Redesign", "Mobile App"],
      hoursLogged: 347
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.s@company.com",
      role: "Employee",
      status: "Active",
      lastActive: "1 day ago",
      department: "Design",
      projects: ["Website Redesign"],
      hoursLogged: 215
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.j@company.com",
      role: "Admin",
      status: "Active",
      lastActive: "3 hours ago",
      department: "Management",
      projects: ["Internal Tools", "CRM Integration"],
      hoursLogged: 412
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@company.com",
      role: "Employee",
      status: "Inactive",
      lastActive: "2 weeks ago",
      department: "Marketing",
      projects: ["Social Media Campaign"],
      hoursLogged: 128
    },
    {
      id: "5",
      name: "Robert Chen",
      email: "robert.c@company.com",
      role: "Manager",
      status: "Pending",
      lastActive: "Never",
      department: "Sales",
      projects: [],
      hoursLogged: 0
    }
  ]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleUserSelect = (userId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === "all-roles" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all-status" || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // User stats
  const activeUsers = users.filter(user => user.status === "Active").length;
  const pendingApprovals = users.filter(user => user.status === "Pending").length;
  const newUsersThisWeek = 15; // Mock data, in real app would be calculated

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MainContent */}
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <UserHeader />
          
          {/* User Stats */}
          <UserStats 
            activeUsers={activeUsers}
            newUsers={newUsersThisWeek}
            pendingApprovals={pendingApprovals}
          />
          
          {/* Filters and Search */}
          <UserFilters
            onSearch={handleSearch}
            onRoleFilter={handleRoleFilter}
            onStatusFilter={handleStatusFilter}
            selectedRole={selectedRole}
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
          />
          
          {/* User Table */}
          <UserTable
            users={filteredUsers}
            onUserClick={handleUserClick}
            selectedUsers={selectedUsers}
            onUserSelect={handleUserSelect}
            onSelectAll={handleSelectAll}
          />
          
          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm">Previous</button>
                <button className="px-3 py-1 bg-gray-100 border rounded text-sm">1</button>
                <button className="px-3 py-1 border rounded text-sm">2</button>
                <button className="px-3 py-1 border rounded text-sm">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* User Detail Dialog */}
      <UserDetailDialog 
        user={selectedUser} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
    </div>
  );
};

export default Users;

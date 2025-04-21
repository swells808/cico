
import React from "react";
import { MoreHorizontal, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import type { User } from "@/pages/Users";

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  selectedUsers: string[];
  onUserSelect: (userId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserClick,
  selectedUsers,
  onUserSelect,
  onSelectAll,
}) => {
  const navigate = useNavigate();
  const allSelected = users.length > 0 && selectedUsers.length === users.length;

  const handleEditUser = (user: User) => {
    navigate(`/users/edit/${user.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={(checked) => onSelectAll(checked === true)}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow 
                key={user.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onUserClick(user)}
              >
                <TableCell className="w-[40px]" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => onUserSelect(user.id, checked === true)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={
                    `px-2 py-1 rounded-full text-xs ${
                      user.status === "Active" ? "bg-green-100 text-green-800" : 
                      user.status === "Inactive" ? "bg-gray-100 text-gray-800" : 
                      "bg-yellow-100 text-yellow-800"
                    }`
                  }>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit User</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

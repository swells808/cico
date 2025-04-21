
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/pages/Users";

interface UserDetailDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View and manage user information
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center mb-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full mr-4"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-lg font-medium">{user.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Personal Information</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Email</span>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Phone</span>
                  <span className="text-sm font-medium">{user.phone || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Department</span>
                  <span className="text-sm font-medium">{user.department || "Not assigned"}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Role & Permissions</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Role</span>
                  <span className="text-sm font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <span className={`text-sm font-medium ${
                    user.status === "Active" ? "text-green-600" : 
                    user.status === "Inactive" ? "text-gray-600" : 
                    "text-yellow-600"
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Projects & Activity</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Assigned Projects</span>
                  <span className="text-sm font-medium">{user.projects?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hours Logged</span>
                  <span className="text-sm font-medium">{user.hoursLogged || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Active</span>
                  <span className="text-sm font-medium">{user.lastActive}</span>
                </div>
              </div>
            </div>
            
            {user.projects && user.projects.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Assigned Projects</h4>
                <div className="mt-2 space-y-1">
                  {user.projects.map((project, index) => (
                    <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              className="bg-[#008000] hover:bg-[#008000]/90"
            >
              Edit User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserFormData } from '@/pages/EditUser';

interface UserRoleAccessProps {
  data: UserFormData;
  setData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

export const UserRoleAccess: React.FC<UserRoleAccessProps> = ({ data, setData }) => {
  const handleRoleChange = (value: string) => {
    setData(prev => ({ ...prev, role: value }));
  };

  const handlePermissionChange = (permission: string) => {
    setData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Role & Access</h2>
      <div className="space-y-4">
        <div>
          <Label>Role</Label>
          <Select value={data.role} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Permissions</Label>
          <div className="space-y-2">
            {[
              { id: 'edit-time', label: 'Can edit time entries' },
              { id: 'view-reports', label: 'Can view reports' },
              { id: 'manage-users', label: 'Can manage users' }
            ].map(permission => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={permission.id}
                  checked={data.permissions.includes(permission.id)}
                  onCheckedChange={() => handlePermissionChange(permission.id)}
                />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

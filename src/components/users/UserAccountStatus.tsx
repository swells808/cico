
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserFormData } from '@/pages/EditUser';

interface UserAccountStatusProps {
  data: UserFormData;
  setData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

export const UserAccountStatus: React.FC<UserAccountStatusProps> = ({ data, setData }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Account Status</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select
            value={data.status}
            onValueChange={(value) => setData(prev => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Reset Password
          </Button>
          <Button variant="outline" className="w-full">
            Force Logout
          </Button>
        </div>
      </div>
    </Card>
  );
};


import React from 'react';
import { Card } from '@/components/ui/card';
import type { UserFormData } from '@/pages/EditUser';

interface UserTimeSummaryProps {
  data: UserFormData;
}

export const UserTimeSummary: React.FC<UserTimeSummaryProps> = ({ data }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Time Summary</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500">Total Hours</label>
          <p className="text-lg font-medium">{data.hoursLogged} hrs</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500">Last Clock In</label>
          <p className="font-medium">{data.lastClockIn}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500">Last Clock Out</label>
          <p className="font-medium">{data.lastClockOut}</p>
        </div>
      </div>
    </Card>
  );
};

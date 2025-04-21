
import React from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { UserFormData } from '@/pages/EditUser';

interface UserNotesProps {
  data: UserFormData;
  setData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

export const UserNotes: React.FC<UserNotesProps> = ({ data, setData }) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Notes & Comments</h2>
      <div className="space-y-4">
        <div>
          <Textarea
            placeholder="Add internal notes..."
            value={data.notes}
            onChange={(e) => setData(prev => ({ ...prev, notes: e.target.value }))}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </Card>
  );
};

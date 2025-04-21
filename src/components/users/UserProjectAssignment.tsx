
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import type { UserFormData } from '@/pages/EditUser';

interface UserProjectAssignmentProps {
  data: UserFormData;
  setData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

export const UserProjectAssignment: React.FC<UserProjectAssignmentProps> = ({ data, setData }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Project Assignment</h2>
        <Button variant="outline" size="sm" className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
      {data.projects.length === 0 ? (
        <p className="text-gray-500 text-sm">No projects assigned</p>
      ) : (
        <div className="space-y-2">
          {data.projects.map(project => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-gray-500">Role: {project.role}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

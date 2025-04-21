import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserHeader } from '@/components/users/UserHeader';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UserProfileForm } from '@/components/users/UserProfileForm';
import { UserRoleAccess } from '@/components/users/UserRoleAccess';
import { UserProjectAssignment } from '@/components/users/UserProjectAssignment';
import { UserAccountStatus } from '@/components/users/UserAccountStatus';
import { UserTimeSummary } from '@/components/users/UserTimeSummary';
import { UserNotes } from '@/components/users/UserNotes';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { UserProfilePhoto } from '@/components/users/UserProfilePhoto';

export interface UserFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  avatar?: string;
  role: string;
  permissions: string[];
  projects: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  status: string;
  notes: string;
  hoursLogged: number;
  lastClockIn: string;
  lastClockOut: string;
}

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isNewUser = !userId;

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    role: 'Employee',
    permissions: [],
    projects: [],
    status: 'Active',
    notes: '',
    hoursLogged: 0,
    lastClockIn: '',
    lastClockOut: '',
    avatar: ''
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    navigate('/users');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/users">Users</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{isNewUser ? 'New User' : formData.firstName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Edit</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {isNewUser ? 'Add New User' : 'Edit User'}
            </h1>
            <Link to="/users" className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Users
            </Link>
          </div>

          {/* Main Form Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <UserProfileForm data={formData} setData={setFormData} />
              <UserRoleAccess data={formData} setData={setFormData} />
              <UserProjectAssignment data={formData} setData={setFormData} />
              <UserNotes data={formData} setData={setFormData} />
            </div>

            {/* Right Column - Status and Summary */}
            <div className="space-y-6">
              <UserProfilePhoto data={formData} setData={setFormData} />
              <UserAccountStatus data={formData} setData={setFormData} />
              {!isNewUser && <UserTimeSummary data={formData} />}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="container mx-auto px-4 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/users')}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, X } from 'lucide-react';

interface TeamMembersStepProps {
  onNext: () => void;
  onBack: () => void;
}

type TeamMember = {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  phone: string;
  department: string;
  role: 'Admin' | 'Manager' | 'Employee';
};

const TeamMembersStep: React.FC<TeamMembersStepProps> = ({ onNext, onBack }) => {
  const [members, setMembers] = useState<TeamMember[]>([{
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    phone: '',
    department: '',
    role: 'Employee'
  }]);

  const handleAddMember = () => {
    setMembers([...members, {
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      phone: '',
      department: '',
      role: 'Employee'
    }]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const handleRoleChange = (index: number, role: 'Admin' | 'Manager' | 'Employee') => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], role };
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the data before proceeding
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Add Team Members</h2>
      
      <div className="space-y-4">
        {members.map((member, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Team Member {index + 1}</h3>
                {members.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveMember(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`firstName-${index}`}>First Name</Label>
                  <Input
                    id={`firstName-${index}`}
                    value={member.firstName}
                    onChange={(e) => handleMemberChange(index, 'firstName', e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                  <Input
                    id={`lastName-${index}`}
                    value={member.lastName}
                    onChange={(e) => handleMemberChange(index, 'lastName', e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div className="mt-3">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                  placeholder="Email address"
                  className="flex-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={member.title}
                    onChange={(e) => handleMemberChange(index, 'title', e.target.value)}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label htmlFor={`phone-${index}`}>Phone</Label>
                  <Input
                    id={`phone-${index}`}
                    value={member.phone}
                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="mt-3">
                <Label htmlFor={`department-${index}`}>Department</Label>
                <Input
                  id={`department-${index}`}
                  value={member.department}
                  onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                  placeholder="Department"
                />
              </div>

              <div className="mt-4">
                <Label className="block mb-2">Role</Label>
                <RadioGroup 
                  value={member.role} 
                  onValueChange={(value) => handleRoleChange(index, value as 'Admin' | 'Manager' | 'Employee')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Admin" id={`admin-${index}`} />
                    <Label htmlFor={`admin-${index}`}>Admin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Manager" id={`manager-${index}`} />
                    <Label htmlFor={`manager-${index}`}>Manager</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Employee" id={`employee-${index}`} />
                    <Label htmlFor={`employee-${index}`}>Employee</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={handleAddMember}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Team Member
        </Button>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-[#008000] hover:bg-[#008000]/90">
          Next
        </Button>
      </div>
    </form>
  );
};

export default TeamMembersStep;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface CompanyDetailsStepProps {
  onNext: () => void;
}

const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ onNext }) => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [departments, setDepartments] = useState<string[]>(['']);

  const handleAddDepartment = () => {
    setDepartments([...departments, '']);
  };

  const handleRemoveDepartment = (index: number) => {
    const newDepartments = [...departments];
    newDepartments.splice(index, 1);
    setDepartments(newDepartments);
  };

  const handleDepartmentChange = (index: number, value: string) => {
    const newDepartments = [...departments];
    newDepartments[index] = value;
    setDepartments(newDepartments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the data before proceeding
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Company Details</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Select your industry"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter company address"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL"
            />
          </div>
        </div>

        <div className="pt-2">
          <Label>Departments</Label>
          <Card className="mt-2">
            <CardContent className="p-4 space-y-2">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={dept}
                    onChange={(e) => handleDepartmentChange(index, e.target.value)}
                    placeholder="Department name"
                    className="flex-1"
                  />
                  {departments.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveDepartment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={handleAddDepartment}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Department
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="pt-2">
          <Label htmlFor="logo" className="block mb-2">Company Logo (Optional)</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            className="cursor-pointer"
          />
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button type="submit" className="bg-[#008000] hover:bg-[#008000]/90">
          Next
        </Button>
      </div>
    </form>
  );
};

export default CompanyDetailsStep;

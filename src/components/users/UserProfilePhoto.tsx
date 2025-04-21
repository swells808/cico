
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ImagePlus, User } from 'lucide-react';
import type { UserFormData } from '@/pages/EditUser';

interface UserProfilePhotoProps {
  data: UserFormData;
  setData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

export const UserProfilePhoto: React.FC<UserProfilePhotoProps> = ({ data, setData }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={data.avatar} alt="Profile photo" />
          <AvatarFallback>
            <User className="h-16 w-16 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center">
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('avatar-upload')?.click()}
            className="flex items-center gap-2"
          >
            <ImagePlus className="h-4 w-4" />
            Change Photo
          </Button>
        </div>
      </div>
    </Card>
  );
};

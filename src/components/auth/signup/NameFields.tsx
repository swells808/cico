
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameFields: React.FC<NameFieldsProps> = ({
  firstName,
  lastName,
  isLoading,
  onChange,
}) => (
  <div className="flex gap-3">
    <div className="flex-1">
      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        name="firstName"
        placeholder="First name"
        value={firstName}
        onChange={onChange}
        disabled={isLoading}
        autoFocus
        required
      />
    </div>
    <div className="flex-1">
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        name="lastName"
        placeholder="Last name"
        value={lastName}
        onChange={onChange}
        disabled={isLoading}
        required
      />
    </div>
  </div>
);

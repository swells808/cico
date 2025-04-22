
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RoleSelectorProps {
  roles: string[];
  current: string;
  onChange: (role: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  current,
  onChange,
}) => (
  <div>
    <Label>Role</Label>
    <RadioGroup
      className="flex gap-4 mt-1"
      value={current}
      onValueChange={onChange}
    >
      {roles.map((role) => (
        <div className="flex items-center space-x-2" key={role}>
          <RadioGroupItem value={role} id={`role-${role}`} />
          <Label htmlFor={`role-${role}`} className="capitalize">
            {role}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

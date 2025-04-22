
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordFields: React.FC<PasswordFieldsProps> = ({
  password,
  confirmPassword,
  isLoading,
  onChange,
}) => (
  <div className="flex gap-3">
    <div className="flex-1">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Create password"
        value={password}
        onChange={onChange}
        disabled={isLoading}
        minLength={8}
        required
      />
    </div>
    <div className="flex-1">
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Repeat password"
        value={confirmPassword}
        onChange={onChange}
        disabled={isLoading}
        minLength={8}
        required
      />
    </div>
  </div>
);

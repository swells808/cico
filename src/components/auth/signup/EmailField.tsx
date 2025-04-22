
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailFieldProps {
  email: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailField: React.FC<EmailFieldProps> = ({ email, isLoading, onChange }) => (
  <div>
    <Label htmlFor="email">Email Address</Label>
    <Input
      id="email"
      name="email"
      type="email"
      placeholder="your@email.com"
      value={email}
      onChange={onChange}
      disabled={isLoading}
      required
    />
  </div>
);

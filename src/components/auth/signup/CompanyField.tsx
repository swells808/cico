
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyFieldProps {
  company: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyField: React.FC<CompanyFieldProps> = ({ company, isLoading, onChange }) => (
  <div>
    <Label htmlFor="company">Company Name</Label>
    <Input
      id="company"
      name="company"
      placeholder="Company name"
      value={company}
      onChange={onChange}
      disabled={isLoading}
      required
    />
  </div>
);

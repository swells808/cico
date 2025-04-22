
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsCheckboxProps {
  agreed: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ agreed, onCheckedChange }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id="tos" checked={agreed} onCheckedChange={onCheckedChange} />
    <Label htmlFor="tos" className="text-xs font-normal">
      I agree to the{" "}
      <a href="/terms" target="_blank" className="text-[#5296ED] hover:underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="/privacy" target="_blank" className="text-[#5296ED] hover:underline">
        Privacy Policy
      </a>
    </Label>
  </div>
);


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { NameFields } from "./signup/NameFields";
import { EmailField } from "./signup/EmailField";
import { CompanyField } from "./signup/CompanyField";
import { PasswordFields } from "./signup/PasswordFields";
import { RoleSelector } from "./signup/RoleSelector";
import { TermsCheckbox } from "./signup/TermsCheckbox";
import { SignupProviders } from "./signup/SignupProviders";
import { SignupLoginLink } from "./signup/SignupLoginLink";

const ROLES = ["Admin", "Manager", "Employee"];

export const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    role: ROLES[2], // Employee default
    agreed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm((f) => ({ ...f, role: value }));
  };

  const handleCheckbox = (checked: boolean) => {
    setForm((f) => ({ ...f, agreed: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) {
      toast({
        title: "You must agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({
        title: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            company: form.company,
            role: form.role,
          },
        },
      });
      if (error) throw error;
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error?.message || "Error signing up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
      autoComplete="off"
      spellCheck={false}
    >
      <NameFields
        firstName={form.firstName}
        lastName={form.lastName}
        isLoading={isLoading}
        onChange={handleChange}
      />
      <EmailField email={form.email} isLoading={isLoading} onChange={handleChange} />
      <CompanyField company={form.company} isLoading={isLoading} onChange={handleChange} />
      <PasswordFields
        password={form.password}
        confirmPassword={form.confirmPassword}
        isLoading={isLoading}
        onChange={handleChange}
      />
      <RoleSelector
        roles={ROLES}
        current={form.role}
        onChange={handleRoleChange}
      />
      <TermsCheckbox agreed={form.agreed} onCheckedChange={handleCheckbox} />
      <Button
        type="submit"
        className="w-full text-base font-semibold bg-[#5296ED] hover:bg-[#5296ED]/90 rounded-lg py-3 mt-1"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account & Start Free Trial"}
      </Button>
      <SignupProviders isLoading={isLoading} />
      <SignupLoginLink />
    </form>
  );
};

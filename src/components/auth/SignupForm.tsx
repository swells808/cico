import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";

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
      {/* Name group */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
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
            value={form.lastName}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
      </div>
      <div>
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          name="company"
          placeholder="Company name"
          value={form.company}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
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
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            minLength={8}
            required
          />
        </div>
      </div>
      <div>
        <Label>Role</Label>
        <RadioGroup
          className="flex gap-4 mt-1"
          value={form.role}
          onValueChange={handleRoleChange}
        >
          {ROLES.map((role) => (
            <div className="flex items-center space-x-2" key={role}>
              <RadioGroupItem value={role} id={`role-${role}`} />
              <Label htmlFor={`role-${role}`} className="capitalize">
                {role}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="tos" checked={form.agreed} onCheckedChange={handleCheckbox} />
        <Label htmlFor="tos" className="text-xs font-normal">
          I agree to the{" "}
          <a href="/terms" target="_blank" className="text-[#9b87f5] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" className="text-[#9b87f5] hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full text-base font-semibold bg-[#5296ED] hover:bg-[#5296ED]/90 rounded-lg py-3 mt-1"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account & Start Free Trial"}
      </Button>
      <div className="flex justify-between mt-4 gap-2">
        <Button
          variant="outline"
          className="w-full border-[#5296ED] text-[#5296ED]"
          type="button"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign Up with Google
        </Button>
        <Button
          variant="outline"
          className="w-full border-[#5296ED] text-[#5296ED]"
          type="button"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Sign Up with Microsoft
        </Button>
      </div>
      <div className="flex justify-center text-xs text-[#5296ED] mt-3">
        <span>
          Already have an account?{" "}
          <Link to="/login" className="text-[#5296ED] hover:underline font-medium">
            Log In
          </Link>
        </span>
      </div>
    </form>
  );
};

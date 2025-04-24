
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { NameFields } from "./signup/NameFields";
import { EmailField } from "./signup/EmailField";
import { CompanyField } from "./signup/CompanyField";
import { PasswordFields } from "./signup/PasswordFields";
import { TermsCheckbox } from "./signup/TermsCheckbox";
import { SignupProviders } from "./signup/SignupProviders";
import { SignupLoginLink } from "./signup/SignupLoginLink";

export const SignupForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (checked: boolean) => {
    setForm((f) => ({ ...f, agreed: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
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
    
    console.log("Starting signup process with form data:", { 
      email: form.email, 
      firstName: form.firstName, 
      lastName: form.lastName,
      company: form.company
    });
    
    setIsLoading(true);
    
    try {
      // Sign up the user using Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            company: form.company,
            role: "Admin", // Always assign Admin role on sign up
          },
        },
      });
      
      console.log("Supabase signup response:", { data, error });
      
      if (error) throw error;
      
      if (data && data.user) {
        console.log("User created successfully:", data.user.id);
        
        toast({
          title: "Account created!",
          description: "Let's finish getting your account set up.",
        });
        
        // Wait a moment before redirecting to ensure toast is visible
        setTimeout(() => {
          console.log("Redirecting to /onboarding");
          navigate("/onboarding");
        }, 1000);
      } else {
        throw new Error("User account could not be created");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      
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
      className="space-y-5 max-w-full"
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

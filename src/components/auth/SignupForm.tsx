
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error when user makes changes
  };

  const handleCheckbox = (checked: boolean) => {
    setForm((f) => ({ ...f, agreed: checked }));
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous state
    setError(null);
    
    if (!form.agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      toast({
        title: "You must agree to the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      toast({
        title: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setFormSubmitted(false);
    
    try {
      console.log("Starting signup process with email:", form.email);
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            company: form.company, // Include company name in metadata
          },
        },
      });
      
      console.log("Signup API response:", { data, error });
      
      if (error) {
        console.error("Signup error:", error);
        
        if (error.status === 429) {
          setError("Too many attempts. Please wait a few minutes before trying again.");
          toast({
            title: "Too many attempts",
            description: "Please wait a few minutes before trying again.",
            variant: "destructive",
          });
        } else if (error.message === "User already registered") {
          setError("This email is already registered. Please log in instead.");
          toast({
            title: "Email already in use",
            description: "This email is already registered. Please log in instead.",
            variant: "destructive",
          });
        } else {
          setError(error?.message || "Error signing up.");
          toast({
            title: "Signup failed",
            description: error?.message || "Error signing up.",
            variant: "destructive",
          });
        }
        throw error;
      }
      
      console.log("Signup successful:", data);
      setFormSubmitted(true);
      
      if (data && data.user) {
        console.log("User created successfully:", data.user.id);
        
        toast({
          title: "Account created!",
          description: "Let's finish setting up your account.",
        });
        
        // Redirect to onboarding after a short delay to ensure toast is visible
        setTimeout(() => {
          navigate("/onboarding");
        }, 1500);
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your registration. Then, you'll be redirected to onboarding.",
        });
      }
    } catch (error: any) {
      console.error("Signup error caught in catch block:", error);
      // Additional error handling is in the previous try/catch
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
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-center">
          <p>{error}</p>
        </div>
      )}
      
      <Button
        type="submit"
        className="w-full text-base font-semibold bg-[#5296ED] hover:bg-[#5296ED]/90 rounded-lg py-3 mt-1"
        disabled={isLoading || formSubmitted}
      >
        {isLoading ? "Creating Account..." : formSubmitted ? "Account Created!" : "Create Account & Start Free Trial"}
      </Button>
      
      {formSubmitted && (
        <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-center">
          <p>Account created successfully! You will be redirected to onboarding shortly.</p>
        </div>
      )}
      
      <SignupProviders isLoading={isLoading} />
      <SignupLoginLink />
    </form>
  );
};

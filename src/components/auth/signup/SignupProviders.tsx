import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface SignupProvidersProps {
  isLoading: boolean;
}

export const SignupProviders: React.FC<SignupProvidersProps> = ({ isLoading }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Error signing up with Google:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign up with Google",
        variant: "destructive",
      });
    }
  };

  const handleMicrosoftSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Error signing up with Microsoft:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign up with Microsoft",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Button
        variant="outline"
        className="w-full border-[#5296ED] text-[#5296ED] flex items-center justify-center"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignup}
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
        className="w-full border-[#5296ED] text-[#5296ED] flex items-center justify-center"
        type="button"
        disabled={isLoading}
        onClick={handleMicrosoftSignup}
      >
        <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 23 23">
          <path fill="#f3f3f3" d="M0 0h23v23H0z" />
          <path fill="#f35325" d="M1 1h10v10H1z" />
          <path fill="#81bc06" d="M12 1h10v10H12z" />
          <path fill="#05a6f0" d="M1 12h10v10H1z" />
          <path fill="#ffba08" d="M12 12h10v10H12z" />
        </svg>
        <span className="truncate">Sign Up with Microsoft</span>
      </Button>
    </div>
  );
};

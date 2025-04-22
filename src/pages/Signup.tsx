
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Color palette variables
const COLORS = {
  primary: "#9b87f5",
  secondary: "#7E69AB",
  light: "#D6BCFA",
  soft: "#E5DEFF",
  blue: "#1EAEDB",
  sky: "#33C3F0",
  gray: "#8E9196",
  dark: "#1A1F2C",
  white: "#FFFFFF",
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      toast({
        title: "Registration successful!",
        description: "Please check your email to confirm your account.",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E5DEFF] via-[#D6BCFA] to-[#9b87f5]">
      <Header />
      <main className="flex-1 pt-20 px-4">
        <div className="container mx-auto max-w-lg py-12">
          {/* Welcome/Onboarding Intro */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">
              Welcome to Your Next Chapter!
            </h1>
            <p className="text-base text-[#7E69AB]">
              We're excited to have you on board. Create your account to unlock powerful features and join our amazing community.
            </p>
          </div>
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-[#D6BCFA]">
            {/* Progress indicator (optional future steps) */}
            {/* <div className="mb-8 flex justify-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#9b87f5]" />
              <div className="w-3 h-3 rounded-full bg-[#E5DEFF]" />
              <div className="w-3 h-3 rounded-full bg-[#E5DEFF]" />
            </div> */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-[#7E69AB]">
                  Email
                </Label>
                <div className="relative mt-1">
                  <span className="absolute top-2.5 left-3 text-[#9b87f5]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. alex@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-[#F5F2FE] focus:bg-white border-[#E5DEFF] focus:border-[#9b87f5] transition"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-[#7E69AB]">
                  Password
                </Label>
                <div className="relative mt-1">
                  <span className="absolute top-2.5 left-3 text-[#9b87f5]">
                    <Lock className="w-4 h-4" />
                  </span>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-[#F5F2FE] focus:bg-white border-[#E5DEFF] focus:border-[#9b87f5] transition"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-[#7E69AB]">
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <span className="absolute top-2.5 left-3 text-[#9b87f5]">
                    <Lock className="w-4 h-4" />
                  </span>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 bg-[#F5F2FE] focus:bg-white border-[#E5DEFF] focus:border-[#9b87f5] transition"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-lg font-semibold bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors py-3 rounded-xl shadow-md"
                disabled={isLoading}
              >
                <UserPlus className="w-5 h-5 mr-1" />
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
            {/* Separator for alternative sign up */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-[#E5DEFF]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#B0A4CE]">or continue with</span>
              </div>
            </div>
            {/* Social signup */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full border-[#D6BCFA] hover:bg-[#F5F2FE] transition-colors text-[#7E69AB]"
                onClick={() => {
                  // Add Google signup logic here (if enabled in Supabase)
                }}
                disabled={isLoading}
                type="button"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#D6BCFA] hover:bg-[#F5F2FE] transition-colors text-[#7E69AB]"
                onClick={() => {
                  // Add Microsoft signup logic here (if enabled in Supabase)
                }}
                disabled={isLoading}
                type="button"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                Microsoft
              </Button>
            </div>
            <p className="text-center text-sm text-[#7E69AB] mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1EAEDB] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;


import React from "react";
import { Link } from "react-router-dom";

export const SignupLoginLink: React.FC = () => (
  <div className="flex justify-center text-xs text-[#5296ED] mt-3">
    <span>
      Already have an account?{" "}
      <Link to="/login" className="text-[#5296ED] hover:underline font-medium">
        Log In
      </Link>
    </span>
  </div>
);

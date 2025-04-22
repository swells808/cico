
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  const progressPercentage = ((currentStep) / totalSteps) * 100;
  
  return (
    <div className={cn("w-full space-y-2", className)}>
      <Progress value={progressPercentage} className="h-2" />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;

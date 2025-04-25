
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface FeaturesStepProps {
  onNext: () => void;
  onBack: () => void;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({ onNext, onBack }) => {
  const [photoCapture, setPhotoCapture] = useState(true);
  const [geolocation, setGeolocation] = useState(true);
  const [employeePin, setEmployeePin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get current user's company ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (!profileData?.company_id) throw new Error("No company found for user");

      // Save features
      const { error: featuresError } = await supabase
        .from('company_features')
        .insert({
          company_id: profileData.company_id,
          photo_capture: photoCapture,
          geolocation: geolocation,
          employee_pin: employeePin
        });

      if (featuresError) throw featuresError;

      onNext();
    } catch (error: any) {
      console.error("Error saving features:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save features",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Enable Features</h2>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="photoCapture" className="text-base font-medium">Photo Capture</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Capture employee photos during clock-in for identity verification
                </p>
              </div>
              <Switch
                id="photoCapture"
                checked={photoCapture}
                onCheckedChange={setPhotoCapture}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="geolocation" className="text-base font-medium">Geolocation Tracking</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Track employee location during clock-in and clock-out
                </p>
              </div>
              <Switch
                id="geolocation"
                checked={geolocation}
                onCheckedChange={setGeolocation}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="employeePin" className="text-base font-medium">Employee Pin</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Require employees to enter a pin code when using the time clock (Default is their phone number).
                </p>
              </div>
              <Switch
                id="employeePin"
                checked={employeePin}
                onCheckedChange={setEmployeePin}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="bg-[#008000] hover:bg-[#008000]/90">
          Next
        </Button>
      </div>
    </form>
  );
};

export default FeaturesStep;

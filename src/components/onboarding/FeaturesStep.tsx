
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface FeaturesStepProps {
  onNext: () => void;
  onBack: () => void;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({ onNext, onBack }) => {
  const [photoCapture, setPhotoCapture] = useState(true);
  const [geolocation, setGeolocation] = useState(true);
  const [timeclockMode, setTimeclockMode] = useState('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the data before proceeding
    onNext();
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
                <Label className="text-base font-medium">Timeclock Mode</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Choose how employees will interact with the timeclock
                </p>
              </div>
              <div className="space-x-3 flex items-center">
                <select
                  value={timeclockMode}
                  onChange={(e) => setTimeclockMode(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="standard">Standard</option>
                  <option value="kiosk">Kiosk</option>
                  <option value="mobile">Mobile Only</option>
                </select>
              </div>
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

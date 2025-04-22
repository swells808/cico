import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectLabel,
} from '@/components/ui/select';
import { CompanyDetailsData } from '@/pages/Onboarding';

// US States, Canadian Provinces, Mexican States
const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida",
  "Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
  "Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska",
  "Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
  "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const CANADIAN_PROVINCES = [
  "Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador",
  "Nova Scotia","Ontario","Prince Edward Island","Quebec","Saskatchewan"
];

const MEXICAN_STATES = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Coahuila",
  "Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","México","Michoacán","Morelos","Nayarit",
  "Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco",
  "Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"
];

const countryOptions = [
  { label: 'United States', value: 'United States' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Mexico', value: 'Mexico' },
];

interface CompanyDetailsStepProps {
  onNext: () => void;
  onComplete?: (fields: CompanyDetailsData) => void;
  initialData?: CompanyDetailsData | null;
}

const validatePhone = (value: string) => {
  // Simple phone validation: US, Canada, Mexico formats allowed (numbers, spaces, dashes, parens, +)
  return /^(\+)?[0-9 ()\-]{7,20}$/.test(value);
};

const validateWebsite = (value: string) => {
  if (!value) return true;
  return /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value) || /^www\.[^\s/$.?#].[^\s]*$/i.test(value);
};

const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ onNext, onComplete, initialData }) => {
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [industry, setIndustry] = useState(initialData?.industry || '');
  const [streetAddress, setStreetAddress] = useState(initialData?.streetAddress || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [stateProvince, setStateProvince] = useState(initialData?.stateProvince || '');
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || '');
  const [country, setCountry] = useState(initialData?.country || 'United States');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [departments, setDepartments] = useState<string[]>(initialData?.departments || ['']);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleAddDepartment = () => {
    setDepartments([...departments, '']);
  };

  const handleRemoveDepartment = (index: number) => {
    const newDepartments = [...departments];
    newDepartments.splice(index, 1);
    setDepartments(newDepartments);
  };

  const handleDepartmentChange = (index: number, value: string) => {
    const newDepartments = [...departments];
    newDepartments[index] = value;
    setDepartments(newDepartments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyDepartments = departments.map(d => d.trim()).filter(Boolean);
    let newErrors: { [key: string]: string } = {};

    if (!companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!streetAddress.trim()) newErrors.streetAddress = 'Street address is required.';
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!stateProvince) newErrors.stateProvince = 'State/Province is required.';
    if (!postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    if (!country) newErrors.country = 'Country is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (phone && !validatePhone(phone)) newErrors.phone = 'Invalid phone format (try +1 212-555-1234).';
    if (website && !validateWebsite(website)) newErrors.website = 'Invalid website URL. Must start with http:// or https:// or www.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Prepare all company details to pass up
    const companyData: CompanyDetailsData = {
      companyName: companyName.trim(),
      industry: industry.trim() || undefined,
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      stateProvince,
      postalCode: postalCode.trim(),
      country,
      phone: phone.trim(),
      website: website.trim() || undefined,
      departments: nonEmptyDepartments.length > 0 ? nonEmptyDepartments : undefined,
    };

    console.log("Company form submitted with data:", companyData);

    if (onComplete) onComplete(companyData);
    else onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-center">Company Details</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
          />
          {errors.companyName && <div className="text-red-500 text-xs mt-1">{errors.companyName}</div>}
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Select your industry"
          />
        </div>
        <div>
          <Label>Address</Label>
          <div className="space-y-2 mt-1">
            <div>
              <Input
                id="street-address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Street Address"
                autoComplete="street-address"
              />
              {errors.streetAddress && <div className="text-red-500 text-xs mt-1">{errors.streetAddress}</div>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  autoComplete="address-level2"
                />
                {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
              </div>
              <div>
                <Select
                  value={stateProvince}
                  onValueChange={setStateProvince}
                >
                  <SelectTrigger id="state-province">
                    <SelectValue placeholder="State/Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>US States</SelectLabel>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Canadian Provinces</SelectLabel>
                      {CANADIAN_PROVINCES.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Mexican States</SelectLabel>
                      {MEXICAN_STATES.map((mexState) => (
                        <SelectItem key={mexState} value={mexState}>
                          {mexState}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.stateProvince && <div className="text-red-500 text-xs mt-1">{errors.stateProvince}</div>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  id="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  autoComplete="postal-code"
                />
                {errors.postalCode && <div className="text-red-500 text-xs mt-1">{errors.postalCode}</div>}
              </div>
              <div>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {countryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.country && <div className="text-red-500 text-xs mt-1">{errors.country}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL"
            />
            {errors.website && <div className="text-red-500 text-xs mt-1">{errors.website}</div>}
          </div>
        </div>
        <div className="pt-2">
          <Label>Departments</Label>
          <Card className="mt-2">
            <CardContent className="p-4 space-y-2">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={dept}
                    onChange={(e) => handleDepartmentChange(index, e.target.value)}
                    placeholder="Department name"
                    className="flex-1"
                  />
                  {departments.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveDepartment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={handleAddDepartment}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Department
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="pt-2">
          <Label htmlFor="logo" className="block mb-2">Company Logo (Optional)</Label>
          <Input
            id="logo"
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="cursor-pointer"
            onChange={e => setCompanyLogo(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <Button type="submit" className="bg-[#008000] hover:bg-[#008000]/90">
          Next
        </Button>
      </div>
    </form>
  );
};

export default CompanyDetailsStep;

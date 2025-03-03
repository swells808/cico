
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabaseAdmin } from "@/integrations/supabase/admin-client";

interface AddUserModalProps {
  onSuccess?: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    pin: "",
    password: "",
    phone: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
    addressCountry: "",
    role: "employee" as "admin" | "manager" | "employee"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, create the user in auth.users
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
          first_name: formData.firstName,
          last_name: formData.lastName
        }
      });

      if (authError) {
        console.error('Auth Error:', authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      console.log('User created:', authData.user);

      // Then create the profile
      const { error: profileError } = await supabaseAdmin.from('profiles').insert({
        id: authData.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        pin_code: formData.pin,
        phone_number: formData.phone,
        address_street: formData.addressStreet,
        address_city: formData.addressCity,
        address_state: formData.addressState,
        address_zip: formData.addressZip,
        address_country: formData.addressCountry
      });

      if (profileError) {
        console.error('Profile Error:', profileError);
        throw profileError;
      }

      // Finally assign the role
      const { error: roleError } = await supabaseAdmin.from('user_roles').insert({
        user_id: authData.user.id,
        role: formData.role
      });

      if (roleError) {
        console.error('Role Error:', roleError);
        throw roleError;
      }

      toast({
        title: "Success",
        description: "User has been created successfully.",
      });
      
      setOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        pin: "",
        password: "",
        phone: "",
        addressStreet: "",
        addressCity: "",
        addressState: "",
        addressZip: "",
        addressCountry: "",
        role: "employee"
      });
      
      onSuccess?.();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4BA0F4] hover:bg-[#4BA0F4]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pin">Default PIN</Label>
              <Input
                id="pin"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.pin}
                onChange={(e) => setFormData(prev => ({ ...prev, pin: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Default Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Address</Label>
            <Input
              placeholder="Street Address"
              value={formData.addressStreet}
              onChange={(e) => setFormData(prev => ({ ...prev, addressStreet: e.target.value }))}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="City"
                value={formData.addressCity}
                onChange={(e) => setFormData(prev => ({ ...prev, addressCity: e.target.value }))}
                required
              />
              <Input
                placeholder="State"
                value={formData.addressState}
                onChange={(e) => setFormData(prev => ({ ...prev, addressState: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="ZIP Code"
                value={formData.addressZip}
                onChange={(e) => setFormData(prev => ({ ...prev, addressZip: e.target.value }))}
                required
              />
              <Input
                placeholder="Country"
                value={formData.addressCountry}
                onChange={(e) => setFormData(prev => ({ ...prev, addressCountry: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "admin" | "manager" | "employee") => 
                setFormData(prev => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

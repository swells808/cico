import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseAdmin } from "@/integrations/supabase/admin-client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  role: "admin" | "manager" | "employee";
}

export const AddUserModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
    addressCountry: "",
    role: "employee"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create the user in auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true
      });

      if (authError) {
        throw authError;
      }

      if (!authData?.user) {
        throw new Error("Failed to create user");
      }

      // Step 2: Create user profile in the users table
      const { error: profileError } = await supabaseAdmin.from('users').insert({
        id: authData.user.id,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        address_street: formData.addressStreet,
        address_city: formData.addressCity,
        address_state: formData.addressState,
        address_zip: formData.addressZip,
        address_country: formData.addressCountry,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        
        // Attempt to clean up the auth user if profile creation fails
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        
        throw profileError;
      }

      // Convert 'manager' role to 'supervisor' which is the allowed enum value in the database
      // This keeps the UI showing 'manager' while correctly mapping to the DB schema
      const dbRole = formData.role === "manager" ? "supervisor" : formData.role;

      // Finally assign the role
      const { error: roleError } = await supabaseAdmin.from('user_roles').insert({
        user_id: authData.user.id,
        role: dbRole
      });

      if (roleError) {
        console.error("Role assignment error:", roleError);
        
        // Attempt to clean up if role assignment fails
        await supabaseAdmin.from('users').delete().eq('id', authData.user.id);
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        
        throw roleError;
      }

      toast({
        title: "User Created",
        description: `Successfully created user ${formData.firstName} ${formData.lastName}`,
      });

      // Reset form and close modal
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        addressStreet: "",
        addressCity: "",
        addressState: "",
        addressZip: "",
        addressCountry: "",
        role: "employee"
      });
      setOpen(false);
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: "Error Creating User",
        description: error.message || "There was an error creating the user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#008000] hover:bg-[#008000]/90 text-white">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="addressStreet">Street Address</Label>
            <Input
              id="addressStreet"
              value={formData.addressStreet}
              onChange={(e) => setFormData(prev => ({ ...prev, addressStreet: e.target.value }))}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="addressCity">City</Label>
              <Input
                id="addressCity"
                value={formData.addressCity}
                onChange={(e) => setFormData(prev => ({ ...prev, addressCity: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressState">State/Province</Label>
              <Input
                id="addressState"
                value={formData.addressState}
                onChange={(e) => setFormData(prev => ({ ...prev, addressState: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="addressZip">Zip/Postal Code</Label>
              <Input
                id="addressZip"
                value={formData.addressZip}
                onChange={(e) => setFormData(prev => ({ ...prev, addressZip: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressCountry">Country</Label>
              <Input
                id="addressCountry"
                value={formData.addressCountry}
                onChange={(e) => setFormData(prev => ({ ...prev, addressCountry: e.target.value }))}
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
              <SelectTrigger id="role">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#008000] hover:bg-[#008000]/90 text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

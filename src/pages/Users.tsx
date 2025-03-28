import React from "react";
import { AddUserModal } from "@/components/users/AddUserModal";

const Users = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <AddUserModal />
      </div>
      
      {/* Rest of the user management interface */}
      <div className="bg-white rounded-lg shadow p-6">
        <p>User list would appear here</p>
      </div>
    </div>
  );
};

export default Users;

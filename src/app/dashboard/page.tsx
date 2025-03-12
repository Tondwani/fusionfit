'use client';

import { useCurrentUserState } from "@/providers/CurrentUserProvide";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-purple-100">
      <div className="flex">
        {/* Left Side Menu */}
        <div className="w-64 min-h-screen bg-white shadow-lg p-6">
          <UserProfile />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
           dashboard content here
        </div>
      </div>
    </div>
  );
}

function UserProfile() {
  const { currentUser } = useCurrentUserState();

  if (!currentUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-purple-200 mx-auto mb-3 flex items-center justify-center">
          <span className="text-2xl text-purple-600">
            {currentUser.name[0].toUpperCase()}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{currentUser.name}</h2>
      </div>
      
      <div className="space-y-3 mt-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Email</label>
          <p className="text-gray-700">{currentUser.email}</p>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Role</label>
          <p className="text-gray-700">{currentUser.role}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Contact Number</label>
          <p className="text-gray-700">{currentUser.contactNumber}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Status</label>
          <p className="text-gray-700">{currentUser.activeState}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Type</label>
          <p className="text-gray-700">{currentUser.planType}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Trial</label>
          <p className="text-gray-700">{currentUser.contactNumber}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Date</label>
          <p className="text-gray-700">{currentUser.date}</p>
        </div>
      </div>
    </div>
  );
}

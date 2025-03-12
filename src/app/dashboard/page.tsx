"use client";

import { useEffect } from "react";
import {
  useCurrentUserState,
  useCurrentUserActions,
} from "@/providers/CurrentUserProvide";

export default function DashboardPage() {
  const { currentUser, iPending, isError } = useCurrentUserState();
  const { getCurrentUser } = useCurrentUserActions();

  useEffect(() => {
    if (!currentUser) {
     
    }
  }, [currentUser, getCurrentUser]);

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="mb-4">
            We couldn't connect to the server. This could be because:
          </p>
          <ul className="list-disc text-left ml-8 mb-4">
            <li>The server is currently waking up (Heroku free tier)</li>
            <li>Your internet connection is unstable</li>
            <li>The server is temporarily down</li>
          </ul>
          <button
            onClick={() => getCurrentUser()}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-100">
        <div className="text-center">
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-purple-200 mx-auto mb-3 flex items-center justify-center">
          <span className="text-2xl text-purple-600">
            {currentUser.name && currentUser.name[0]
              ? currentUser.name[0].toUpperCase()
              : "?"}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {currentUser.name || "User"}
        </h2>
      </div>

      <div className="space-y-3 mt-6">
        <div className="space-y-1">
          <label className="text-sm text-gray-500">Email</label>
          <p className="text-gray-700">{currentUser.email || "N/A"}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Role</label>
          <p className="text-gray-700">{currentUser.role || "N/A"}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Contact Number</label>
          <p className="text-gray-700">{currentUser.contactNumber || "N/A"}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Status</label>
          <p className="text-gray-700">
            {currentUser.activeState === true
              ? "Active"
              : currentUser.activeState === false
              ? "Inactive"
              : "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Type</label>
          <p className="text-gray-700">{currentUser.planType || "N/A"}</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Trial</label>
          <p className="text-gray-700">
            {currentUser.trial === true
              ? "Yes"
              : currentUser.trial === false
              ? "No"
              : "N/A"}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-500">Date</label>
          <p className="text-gray-700">{currentUser.date || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

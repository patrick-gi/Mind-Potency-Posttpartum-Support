
import React, { useState } from 'react';

export const ProfileView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Registered User',
    email: 'user@example.com',
    memberSince: 'January 2024',
  });
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
  });

  const handleEdit = () => {
    setFormData({ name: userData.name, email: userData.email });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setUserData(prev => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
        className="relative flex items-center justify-center h-full p-4 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?mother,baby,soft,light')" }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-lg"></div>
      <div className="relative bg-white/90 rounded-lg shadow-xl w-full max-w-2xl p-8 backdrop-blur-md">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://source.unsplash.com/150x150/?woman,portrait"
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-[#EAE2D8]"
          />
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-3xl font-bold text-[#5B4F47] bg-gray-100 border border-gray-300 rounded-md p-2 w-full max-w-xs text-center"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-md text-[#9D8B80] mt-2 bg-gray-100 border border-gray-300 rounded-md p-2 w-full max-w-xs text-center"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-[#5B4F47]">{userData.name}</h2>
              <p className="text-md text-[#9D8B80] mt-1">{userData.email}</p>
            </>
          )}
          <p className="text-sm text-gray-500 mt-2">Member Since: {userData.memberSince}</p>
        </div>

        <hr className="my-8 border-gray-200" />

        <div>
          <h3 className="text-xl font-semibold text-[#5B4F47] mb-4">Account Settings</h3>
          {isEditing ? (
            <div className="flex space-x-3">
              <button 
                onClick={handleSave}
                className="w-full p-3 bg-[#7C5E4A] text-white rounded-lg transition-colors font-semibold hover:bg-[#5B4F47]"
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                className="w-full p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-[#5B4F47] font-semibold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button onClick={handleEdit} className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-[#5B4F47]">
                Edit Profile
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-[#5B4F47]">
                Change Password
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-[#5B4F47]">
                Privacy Settings
              </button>
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="mt-8">
               <button className="w-full p-3 bg-transparent hover:bg-red-50 border border-red-300 text-red-500 hover:text-red-600 hover:border-red-400 rounded-lg transition-colors font-semibold">
                Log Out
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

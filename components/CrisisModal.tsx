
import React from 'react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-red-800 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full m-4">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Immediate Support is Available</h2>
        <p className="text-gray-700 mb-6">
          It sounds like you are going through a very difficult time. Please know that help is available and you don't have to go through this alone.
        </p>
        <div className="space-y-4">
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800">National Crisis and Suicide Lifeline</h3>
                <p className="text-2xl font-bold text-red-600">Call or Text 988</p>
                <p className="text-sm text-gray-500">Available 24/7 in the US and Canada.</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800">Postpartum Support International (PSI) Helpline</h3>
                <p className="text-2xl font-bold text-red-600">Call 1-800-944-4773</p>
                 <p className="text-sm text-gray-500">Help for moms and families.</p>
            </div>
        </div>
        <p className="text-gray-600 my-6 font-semibold">
          If you or someone else is in immediate danger, please call 911.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

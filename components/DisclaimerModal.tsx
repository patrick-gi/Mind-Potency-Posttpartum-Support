
import React from 'react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full m-4 text-center">
        <h2 className="text-2xl font-bold text-[#5B4F47] mb-4">Welcome to Mind-Potency</h2>
        <p className="text-[#7C5E4A] mb-6">
          Please remember that I am an AI companion and not a substitute for professional medical advice, diagnosis, or treatment. I'm here to provide support, but I cannot offer medical guidance.
        </p>
        <p className="text-[#7C5E4A] mb-6 font-semibold">
          If you are in crisis or believe you may have a medical emergency, please call your doctor or a crisis hotline immediately.
        </p>
        <button
          onClick={onAccept}
          className="w-full bg-[#7C5E4A] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5B4F47] transition-colors"
        >
          I Understand and Accept
        </button>
      </div>
    </div>
  );
};

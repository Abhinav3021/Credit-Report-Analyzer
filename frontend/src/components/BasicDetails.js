import React from 'react';

const getScoreColorClasses = (score) => {
  if (score >= 750) return 'bg-green-500'; // Excellent
  if (score >= 700) return 'bg-blue-500';  // Good
  if (score >= 650) return 'bg-yellow-500 text-gray-800'; // Fair
  return 'bg-red-500'; // Poor
};

const BasicDetails = ({ details }) => {
  if (!details) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Details</h3>
      <div className="flex justify-between items-center flex-wrap gap-y-4">
        {/* CORRECTED: Changed from grid to a wrapping flexbox for better responsiveness */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 flex-grow">
          <div className="flex flex-col">
            <strong className="text-sm font-medium text-gray-500">Name</strong>
            <span className="text-lg text-gray-800 break-words">{details.name}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-sm font-medium text-gray-500">Mobile</strong>
            <span className="text-lg text-gray-800 break-words">{details.mobilePhone}</span>
          </div>
          <div className="flex flex-col">
            <strong className="text-sm font-medium text-gray-500">PAN</strong>
            <span className="text-lg text-gray-800 break-words">{details.pan}</span>
          </div>
        </div>

        {/* This part remains the same */}
        <div className="mt-4 sm:mt-0 sm:ml-8 text-center flex-shrink-0 mx-auto sm:mx-0">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto ${getScoreColorClasses(details.creditScore)}`}>
            {details.creditScore}
          </div>
          <p className="mt-2 text-md font-semibold text-gray-600">Credit Score</p>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
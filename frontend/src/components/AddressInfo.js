import React from 'react';

const AddressInfo = ({ addresses }) => {
  if (!addresses || addresses.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Addresses on File</h3>
      <ul className="space-y-3">
        {addresses.map((addr, index) => (
          <li key={index} className="p-3 bg-gray-50 rounded-md text-gray-700 border border-gray-200">
            {`${addr.fullAddress}, ${addr.city}, ${addr.state} - ${addr.zip}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressInfo;
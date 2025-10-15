import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';


const getStatusIndicator = (daysPastDue) => {
  const dpd = parseInt(daysPastDue, 10);
  if (dpd === 0) {
    return <span className="w-5 h-5 bg-green-500 rounded-full block" title="Paid on Time"></span>;
  }
  if (dpd > 0 && dpd <= 30) {
    return <span className="w-5 h-5 bg-yellow-400 rounded-full block" title={`${dpd} Days Late`}></span>;
  }
  if (dpd > 30) {
    return <span className="w-5 h-5 bg-red-500 rounded-full block" title={`${dpd} Days Late`}></span>;
  }
  return <span className="w-5 h-5 bg-gray-300 rounded-full block" title="Status Unknown"></span>;
};

const PaymentHistory = ({ accounts }) => {
  const accountsWithHistory = accounts.filter(acc => acc.paymentHistory && acc.paymentHistory.length > 0);

  if (accountsWithHistory.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <CalendarDaysIcon className="h-6 w-6 mr-2 text-indigo-500" />
        Payment History
      </h3>
      <div className="space-y-6">
        {accountsWithHistory.map((account) => (
          <div key={account._id}>
            <p className="font-semibold text-gray-700">{account.subscriberName} - {account.accountNumber}</p>
            <div className="mt-2 grid grid-cols-6 sm:grid-cols-12 gap-3">
              {/* We only show the last 12 months for a clean UI */}
              {account.paymentHistory.slice(0, 12).map((entry, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-500">{entry.month}/{entry.year}</p>
                  <div className="flex justify-center mt-1">
                    {getStatusIndicator(entry.daysPastDue)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center"><span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>On Time</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>1-30 Days Late</div>
            <div className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>{'>'}30 Days Late</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
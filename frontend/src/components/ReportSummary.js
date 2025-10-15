import React from 'react';
import {
  BanknotesIcon,
  ChartBarIcon,
  CircleStackIcon,
  ClockIcon,
  LockClosedIcon,
  LockOpenIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  'Total Accounts': CircleStackIcon,
  'Active Accounts': ChartBarIcon,
  'Closed Accounts': ClockIcon,
  'Current Balance': ScaleIcon,
  'Secured Balance': LockClosedIcon,
  'Unsecured Balance': LockOpenIcon,
  'Enquiries (Last 7 Days)': BanknotesIcon,
};

const ReportSummary = ({ summary }) => {
  if (!summary) return null;
  const formatNumber = (num) => (num != null ? num.toLocaleString('en-IN') : '0');

  const summaryItems = [
    { label: 'Total Accounts', value: summary.totalAccounts },
    { label: 'Active Accounts', value: summary.activeAccounts },
    { label: 'Closed Accounts', value: summary.closedAccounts },
    { label: 'Current Balance', value: `₹${formatNumber(summary.currentBalanceAll)}` },
    { label: 'Secured Balance', value: `₹${formatNumber(summary.securedBalance)}` },
    { label: 'Unsecured Balance', value: `₹${formatNumber(summary.unsecuredBalance)}` },
    { label: 'Enquiries (Last 7 Days)', value: summary.enquiriesLast7Days },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Report Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        {summaryItems.map((item) => {
          const Icon = iconMap[item.label];
          return (
            <div key={item.label} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <Icon className="h-6 w-6 text-indigo-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <span className="text-lg font-bold text-slate-800">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportSummary;
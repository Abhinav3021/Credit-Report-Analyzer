import React from 'react';
import { DocumentChartBarIcon } from '@heroicons/react/24/solid';

const Header = () => {
  return (
    <header className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <DocumentChartBarIcon className="h-8 w-8 text-indigo-400" />
            <span className="ml-3 text-2xl font-bold text-white">
              Credit Report Analyzer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api.service';
import BasicDetails from '../components/BasicDetails';
import ReportSummary from '../components/ReportSummary';
import CreditAccounts from '../components/CreditAccounts';
// import AddressInfo from '../components/AddressInfo';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PaymentHistory from '../components/PaymentHistory';

const ReportDetailPage = () => {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getReportById(id);
        setReport(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, [id]);


  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-500">Loading report...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors mb-6 group"
      >
        <ArrowLeftIcon className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
        <span>Back to All Reports</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column for Summary */}
        <div className="lg:col-span-1 space-y-8">
          <BasicDetails details={report.basicDetails} />
          <ReportSummary summary={report.reportSummary} />
        </div>

        {/* Right Column for Details */}
        <div className="lg:col-span-2 space-y-8">
          <CreditAccounts accounts={report.creditAccounts} />
          
          <PaymentHistory accounts={report.creditAccounts} />
          {/* <AddressInfo addresses={report.addresses} /> */}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;
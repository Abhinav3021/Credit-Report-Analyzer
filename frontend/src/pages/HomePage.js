import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';

const HomePage = () => {
  const [reports, setReports] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchReports = async () => {
    try {
      const response = await apiService.getAllReports();
      
      // --- FIX STARTS HERE ---
      // We check if the response data is actually an array before setting it.
      if (Array.isArray(response.data)) {
        setReports(response.data);
      } else {
        // If it's not an array, we log a warning and set an empty array to prevent a crash.
        console.error("API did not return an array for reports:", response.data);
        setReports([]); 
      }
      // --- FIX ENDS HERE ---

    } catch (error) {
      console.error('Failed to fetch reports:', error);
      setMessage('Error: Could not fetch reports.');
      setReports([]); // Also ensure reports is an array on error
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }
    setIsLoading(true);
    setMessage('Uploading...');
    try {
      await apiService.uploadReport(selectedFile);
      setMessage('File uploaded successfully! Report is now available.');
      setSelectedFile(null);
      document.getElementById('file-input').value = null;
      fetchReports();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Upload failed. Please try again.';
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Credit Report Analyzer</h1>
        
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload New XML Report</h2>
          <div className="flex items-center space-x-4">
            <input
              id="file-input"
              type="file"
              accept=".xml,text/xml"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {message && <p className="mt-4 text-sm text-gray-600 bg-gray-200 p-3 rounded-md">{message}</p>}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Reports</h2>
          {/* This check is now safe because we guarantee 'reports' is an array */}
          {reports.length === 0 ? (
            <p className="text-gray-500">No reports found. Upload one to get started.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report._id} className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-md px-2">
                  <Link to={`/report/${report._id}`} className="text-blue-600 hover:underline font-medium">
                    Report for {report.basicDetails.name} (PAN: {report.basicDetails.pan})
                  </Link>
                  <span className="text-lg font-bold text-gray-700">
                    Score: <span className="text-blue-700">{report.basicDetails.creditScore}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

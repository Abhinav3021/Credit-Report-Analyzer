import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports';


const uploadReport = (file) => {
  const formData = new FormData();

  formData.append('report', file);

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


const getAllReports = () => {
  return axios.get(API_URL);
};


const getReportById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const apiService = {
  uploadReport,
  getAllReports,
  getReportById,
};

export default apiService;
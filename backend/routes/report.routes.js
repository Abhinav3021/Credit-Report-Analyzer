const express = require('express');
const multer = require('multer');
const {
  uploadReport,
  getAllReports,
  getReportById,
} = require('../controllers/report.controller');

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {

    if (file.mimetype === 'text/xml' || file.mimetype === 'application/xml') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only XML files are allowed.'), false);
    }
  },
});


// To upload the report and extract the data
router.post('/upload', upload.single('report'), uploadReport);


//  To get a list of all reports
router.get('/', getAllReports);


//   To get the full details of a single report by its ID
router.get('/:id', getReportById);

module.exports = router;
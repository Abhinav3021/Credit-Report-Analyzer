const { parseStringPromise } = require('xml2js');
const CreditReport = require('../models/creditReport.model');


const get = (obj, path) => path.split('.').reduce((acc, part) => acc?.[part], obj);


const extractDataFromXml = (json) => {
  const currentApp = get(json, 'INProfileResponse.Current_Application.0.Current_Application_Details.0');
  const summarySection = get(json, 'INProfileResponse.CAIS_Account.0.CAIS_Summary.0');
  const holderIdSection = get(json, 'INProfileResponse.CAIS_Account.0.CAIS_Account_DETAILS.0.CAIS_Holder_ID_Details.0');
  const accounts = get(json, 'INProfileResponse.CAIS_Account.0.CAIS_Account_DETAILS') || [];

  // 1. Basic Details
  const basicDetails = {
    name: `${get(currentApp, 'Current_Applicant_Details.0.First_Name.0')} ${get(currentApp, 'Current_Applicant_Details.0.Last_Name.0')}`,
    mobilePhone: get(currentApp, 'Current_Applicant_Details.0.MobilePhoneNumber.0'),
    pan: get(holderIdSection, 'Income_TAX_PAN.0'), // <-- CORRECTED PAN PATH
    creditScore: parseInt(get(json, 'INProfileResponse.SCORE.0.BureauScore.0'), 10),
  };

  // 2. Report Summary
  const reportSummary = {
    totalAccounts: parseInt(get(summarySection, 'Credit_Account.0.CreditAccountTotal.0'), 10),
    activeAccounts: parseInt(get(summarySection, 'Credit_Account.0.CreditAccountActive.0'), 10),
    closedAccounts: parseInt(get(summarySection, 'Credit_Account.0.CreditAccountClosed.0'), 10),
    currentBalanceAll: parseFloat(get(summarySection, 'Total_Outstanding_Balance.0.Outstanding_Balance_All.0')),
    securedBalance: parseFloat(get(summarySection, 'Total_Outstanding_Balance.0.Outstanding_Balance_Secured.0')),
    unsecuredBalance: parseFloat(get(summarySection, 'Total_Outstanding_Balance.0.Outstanding_Balance_UnSecured.0')),
    enquiriesLast7Days: parseInt(get(json, 'INProfileResponse.TotalCAPS_Summary.0.TotalCAPSLast7Days.0'), 10),
  };
  
  // 3. Credit Accounts
  const creditAccounts = accounts.map(acc => {
    
    return {
      accountNumber: get(acc, 'Account_Number.0'),
      subscriberName: get(acc, 'Subscriber_Name.0'),
      currentBalance: parseFloat(get(acc, 'Current_Balance.0')),
      amountOverdue: parseFloat(get(acc, 'Amount_Past_Due.0')), 
      accountType: get(acc, 'Account_Type.0'),
      openDate: get(acc, 'Open_Date.0'),
      dateReported: get(acc, 'Date_Reported.0'),
    };
  });

  // 4. Addresses
  const allAddresses = [];
  accounts.forEach(acc => {
    const addresses = get(acc, 'CAIS_Holder_Address_Details') || [];
    addresses.forEach(addr => {
        // Constructing a readable full address
        const fullAddress = [
            get(addr, 'First_Line_Of_Address_non_normalized.0'),
            get(addr, 'Second_Line_Of_Address_non_normalized.0'),
            get(addr, 'Third_Line_Of_Address_non_normalized.0')
        ].filter(Boolean).join(', '); // Filter out empty parts and join

        allAddresses.push({
            fullAddress: fullAddress,
            city: get(addr, 'City_non_normalized.0'),
            state: get(addr, 'State_non_normalized.0'),
            zip: get(addr, 'ZIP_Postal_Code_non_normalized.0'),
        });
    });
  });
  
  return {
    basicDetails,
    reportSummary,
    creditAccounts,
    addresses: allAddresses,
  };
};


const uploadReport = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded. Please select an XML file.' });
  }

  try {
    // 1. Parse the XML file buffer to a JavaScript object
    const xmlData = req.file.buffer.toString('utf-8');
    const parsedJson = await parseStringPromise(xmlData);

    // 2. Extract and structure the data using our helper
    const reportData = extractDataFromXml(parsedJson);

    // 3. Check if a report with this PAN already exists to avoid duplicates
    const pan = reportData.basicDetails.pan;
    if (!pan) {
        return res.status(400).json({ message: 'PAN not found in the XML file.' });
    }

    const existingReport = await CreditReport.findOne({ 'basicDetails.pan': pan });
    if (existingReport) {
      return res.status(409).json({ message: `A credit report for PAN ${pan} already exists.` });
    }

    // 4. Create and save the new report
    const newReport = await CreditReport.create(reportData);
    
    res.status(201).json({
      message: 'File uploaded and processed successfully!',
      data: newReport,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    // Distinguish between parsing and other errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Data validation failed', details: error.message });
    }
    res.status(500).json({ message: 'Server error while processing the file.' });
  }
};


const getAllReports = async (req, res) => {
  try {

    const reports = await CreditReport.find({})
      .select('basicDetails createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Server error while fetching reports.' });
  }
};


const getReportById = async (req, res) => {
  try {
    const report = await CreditReport.findById(req.params.id);

    if (report) {
      res.status(200).json(report);
    } else {
      
      res.status(404).json({ message: 'Credit report not found.' });
    }
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    res.status(500).json({ message: 'Server error while fetching the report.' });
  }
};

module.exports = {
  uploadReport,
  getAllReports, 
  getReportById, 
};
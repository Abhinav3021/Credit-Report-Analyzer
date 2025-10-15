const mongoose = require('mongoose');

const creditAccountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  subscriberName: { type: String, default: 'N/A' },
  currentBalance: { type: Number, required: true },
  amountOverdue: { type: Number, required: true },
  accountType: { type: String, default: 'N/A' },
  openDate: { type: Date },
  dateReported: { type: Date },
});

const addressSchema = new mongoose.Schema({
  fullAddress: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
});

const creditReportSchema = new mongoose.Schema(
  {
    basicDetails: {
      name: { type: String, required: true },
      mobilePhone: { type: String, required: true },
      pan: { type: String, required: true, unique: true },
      creditScore: { type: Number, required: true },
    },
    reportSummary: {
      totalAccounts: { type: Number, required: true },
      activeAccounts: { type: Number, required: true },
      closedAccounts: { type: Number, required: true },
      currentBalanceAll: { type: Number, required: true },
      securedBalance: { type: Number, required: true },
      unsecuredBalance: { type: Number, required: true },
      enquiriesLast7Days: { type: Number, required: true },
    },
    creditAccounts: [creditAccountSchema],
    addresses: [addressSchema],
  },
  {
    timestamps: true,
  }
);

const CreditReport = mongoose.model('CreditReport', creditReportSchema);

module.exports = CreditReport;
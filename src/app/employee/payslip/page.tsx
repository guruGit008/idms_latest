'use client';

import React, { useMemo, CSSProperties } from 'react';
import { Download, Printer, DollarSign } from 'lucide-react';

// --- Type Definitions ---
interface PayslipData {
  month: string;
  employeeId: string;
  name: string;
  designation: string;
  payDate: string;
  earnings: { description: string; amount: number }[];
  deductions: { description: string; amount: number }[];
}

// --- Style Constants (For Print Reliability) ---
// These styles ensure tables render correctly across different devices and print outputs.
const TABLE_BORDER_STYLE: CSSProperties = {
  borderCollapse: 'collapse',
  border: '1px solid #ddd',
  width: '100%',
  marginBottom: '20px',
  fontSize: '14px',
};

const CELL_STYLE: CSSProperties = {
  border: '1px solid #ddd',
  padding: '10px 14px',
  textAlign: 'left',
};

const HEADER_STYLE: CSSProperties = {
  ...CELL_STYLE,
  backgroundColor: '#eef2ff', // A light background for headers
  fontWeight: 'bold',
  color: '#374151',
  textTransform: 'uppercase',
};

// --- Mock Data ---
const mockPayslipData: PayslipData = {
  month: 'October 2025',
  employeeId: 'EMP00123',
  name: 'Jane Doe',
  designation: 'Senior Software Engineer',
  payDate: '2025-10-30',
  earnings: [
    { description: 'Basic Salary', amount: 5000.00 },
    { description: 'Housing Allowance', amount: 1500.00 },
    { description: 'Transport Allowance', amount: 500.00 },
    { description: 'Incentive Bonus', amount: 200.00 },
  ],
  deductions: [
    { description: 'Income Tax (IT)', amount: 550.00 },
    { description: 'Provident Fund (PF)', amount: 600.00 },
    { description: 'Professional Tax (PT)', amount: 20.00 },
    { description: 'Health Insurance', amount: 100.00 },
  ],
};

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

// Main component starts here
export default function PayslipPage() {
  const { earningsTotal, deductionsTotal, netPay } = useMemo(() => {
    const earningsTotal = mockPayslipData.earnings.reduce((sum, item) => sum + item.amount, 0);
    const deductionsTotal = mockPayslipData.deductions.reduce((sum, item) => sum + item.amount, 0);
    const netPay = earningsTotal - deductionsTotal;
    return { earningsTotal, deductionsTotal, netPay };
  }, []);

  const CompanyInfo = () => (
    <div className="p-4 border-b border-gray-200 mb-6 bg-indigo-50/50 rounded-t-lg">
      <h2 className="text-2xl font-extrabold text-indigo-700">Acme Solutions Inc.</h2>
      <p className="text-sm text-gray-600 mt-1">123 Tech Drive, Silicon Valley, CA 94000</p>
      <p className="text-xs text-gray-500">support@acmesolutions.com | +1 (555) 123-4567</p>
    </div>
  );

  const EmployeeDetails = () => (
    <table style={TABLE_BORDER_STYLE}>
      <tbody>
        <tr>
          <td style={HEADER_STYLE} className="w-1/4">Employee Name</td>
          <td style={CELL_STYLE}>{mockPayslipData.name}</td>
          <td style={HEADER_STYLE} className="w-1/4">Pay Period</td>
          <td style={CELL_STYLE}>{mockPayslipData.month}</td>
        </tr>
        <tr>
          <td style={HEADER_STYLE}>Employee ID</td>
          <td style={CELL_STYLE}>{mockPayslipData.employeeId}</td>
          <td style={HEADER_STYLE}>Designation</td>
          <td style={CELL_STYLE}>{mockPayslipData.designation}</td>
        </tr>
        <tr>
          <td style={HEADER_STYLE}>Payment Date</td>
          <td style={CELL_STYLE} colSpan={3} className="font-semibold text-indigo-600">{mockPayslipData.payDate}</td>
        </tr>
      </tbody>
    </table>
  );

  const FinancialSummary = ({ title, items, total }: { title: string, items: { description: string; amount: number }[], total: number }) => (
    <div className="w-full md:w-1/2 p-2">
      <table style={{ ...TABLE_BORDER_STYLE, marginBottom: '0px' }}>
        <thead>
          <tr>
            <th style={{ ...HEADER_STYLE, textAlign: 'center', backgroundColor: title === 'Earnings' ? '#c7d2fe' : '#fecaca' }} colSpan={2}>
              {title}
            </th>
          </tr>
          <tr>
            <th style={HEADER_STYLE}>Description</th>
            <th style={{ ...HEADER_STYLE, width: '30%', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td style={CELL_STYLE}>{item.description}</td>
              <td style={{ ...CELL_STYLE, textAlign: 'right' }}>{formatCurrency(item.amount)}</td>
            </tr>
          ))}
          {/* Filler rows for balance/visual consistency */}
          {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, index) => (
            <tr key={`filler-${index}`}>
              <td style={CELL_STYLE}>&nbsp;</td>
              <td style={CELL_STYLE}>&nbsp;</td>
            </tr>
          ))}
          <tr>
            <td style={{ ...HEADER_STYLE, backgroundColor: '#e5e7eb', fontWeight: 'bold' }}>Total {title}</td>
            <td style={{ ...HEADER_STYLE, backgroundColor: '#e5e7eb', textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      {/* Control Buttons (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-3 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Payslip
        </button>
        <button
          // Placeholder for actual PDF download logic
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-xl border border-indigo-600 shadow-lg hover:bg-indigo-50 transition duration-150 transform hover:scale-[1.02]"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      {/* Payslip Document Container */}
      <div id="payslip-document" className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:rounded-none">
        <div style={{ fontFamily: 'Inter, sans-serif' }} className="p-4 md:p-8">
          
          <div className="flex items-center justify-center mb-6">
            <DollarSign className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-extrabold text-gray-800">
              OFFICIAL PAYSLIP
            </h1>
          </div>

          <CompanyInfo />
          
          <h3 className="text-lg font-semibold mb-3 mt-6 text-gray-700">Employee & Pay Period Details</h3>
          <EmployeeDetails />

          <h3 className="text-lg font-semibold mb-3 mt-6 text-gray-700">Financial Breakdown</h3>
          <div className="flex flex-wrap -mx-2">
            <FinancialSummary title="Earnings" items={mockPayslipData.earnings} total={earningsTotal} />
            <FinancialSummary title="Deductions" items={mockPayslipData.deductions} total={deductionsTotal} />
          </div>

          {/* NET PAY SUMMARY */}
          <div className="mt-10 p-6 bg-indigo-100 rounded-xl border-2 border-indigo-300 flex flex-col md:flex-row justify-between items-center shadow-inner">
            <div className="flex items-center mb-3 md:mb-0">
                <DollarSign className="w-8 h-8 text-indigo-700 mr-3" />
                <h3 className="text-xl font-extrabold text-indigo-800 tracking-wider">NET PAY (Paid to Account)</h3>
            </div>
            <p className="text-5xl font-black text-indigo-600">{formatCurrency(netPay)}</p>
          </div>
          {/* END NET PAY SUMMARY */}

          <p className="text-center text-xs text-gray-500 mt-12 pt-4 border-t border-gray-100">
            This is a confidential, system-generated document and requires no signature. All figures are in USD.
          </p>

        </div>
      </div>
    </div>
  );
}
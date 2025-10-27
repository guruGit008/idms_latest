'use client';

import React, { useMemo, CSSProperties } from 'react';
import { Download, Printer } from 'lucide-react';

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

// --- Style Constants (The Fix) ---
// We explicitly type the object using CSSProperties to satisfy the strict type requirements.
const TABLE_BORDER_STYLE: CSSProperties = {
  borderCollapse: 'collapse', // Correctly typed as 'BorderCollapse'
  border: '1px solid #ddd',
  width: '100%',
  marginBottom: '20px',
  fontSize: '14px',
};

const CELL_STYLE: CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px 12px',
  textAlign: 'left',
};

const HEADER_STYLE: CSSProperties = {
  ...CELL_STYLE,
  backgroundColor: '#f3f4f6',
  fontWeight: 'bold',
  color: '#1f2937',
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
    { description: 'Bonus', amount: 200.00 },
  ],
  deductions: [
    { description: 'Income Tax (IT)', amount: 550.00 },
    { description: 'Provident Fund (PF)', amount: 600.00 },
    { description: 'Professional Tax (PT)', amount: 20.00 },
  ],
};

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export default function PayslipPage() {
  const { earningsTotal, deductionsTotal, netPay } = useMemo(() => {
    const earningsTotal = mockPayslipData.earnings.reduce((sum, item) => sum + item.amount, 0);
    const deductionsTotal = mockPayslipData.deductions.reduce((sum, item) => sum + item.amount, 0);
    const netPay = earningsTotal - deductionsTotal;
    return { earningsTotal, deductionsTotal, netPay };
  }, []);

  const CompanyInfo = () => (
    <div style={{ padding: '20px', borderBottom: '1px solid #ddd', marginBottom: '15px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Acme Solutions Inc.</h2>
      <p style={{ fontSize: '12px', color: '#6b7280' }}>123 Tech Drive, Silicon Valley, CA 94000</p>
      <p style={{ fontSize: '12px', color: '#6b7280' }}>support@acmesolutions.com | +1 (555) 123-4567</p>
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
          <td style={CELL_STYLE} colSpan={3}>{mockPayslipData.payDate}</td>
        </tr>
      </tbody>
    </table>
  );

  const FinancialSummary = ({ title, items, total }: { title: string, items: { description: string; amount: number }[], total: number }) => (
    <div className="w-full md:w-1/2 p-2">
      <table style={{ ...TABLE_BORDER_STYLE, marginBottom: '0px' }}>
        <thead>
          <tr>
            <th style={{ ...HEADER_STYLE, textAlign: 'center' }} colSpan={2}>{title}</th>
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
          <tr>
            <td style={{ ...HEADER_STYLE, backgroundColor: '#e5e7eb' }}>Total {title}</td>
            <td style={{ ...HEADER_STYLE, backgroundColor: '#e5e7eb', textAlign: 'right' }}>{formatCurrency(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-3 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Payslip
        </button>
        <button
          // Placeholder for actual PDF download logic
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-lg border border-indigo-600 shadow-md hover:bg-indigo-50 transition duration-150"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div id="payslip-document" className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden p-6 md:p-10">
        <div style={{ fontFamily: 'sans-serif' }}>
          
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#10b981' }}>
            PAYSLIP
          </h1>

          <CompanyInfo />
          
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>Employee Details</h3>
          <EmployeeDetails />

          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>Financial Breakdown</h3>
          <div className="flex flex-wrap -mx-2">
            <FinancialSummary title="Earnings" items={mockPayslipData.earnings} total={earningsTotal} />
            <FinancialSummary title="Deductions" items={mockPayslipData.deductions} total={deductionsTotal} />
          </div>

          <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-300">
            <h3 className="text-xl font-extrabold text-emerald-800">NET PAY</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{formatCurrency(netPay)}</p>
            <p className="text-sm text-gray-600 mt-2">
              The amount is calculated as Total Earnings minus Total Deductions.
            </p>
          </div>

          <p className="text-center text-xs text-gray-500 mt-12 pt-4 border-t border-gray-200">
            This is a computer-generated document and requires no signature.
          </p>

        </div>
      </div>
    </div>
  );
}

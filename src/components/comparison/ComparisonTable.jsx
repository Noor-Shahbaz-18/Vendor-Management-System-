import React from 'react';
import QuotationStatusBadge from '../quotation/QuotationStatusBadge';
import { formatDate } from '../../utils/formatDate';

const ComparisonTable = ({ quotations }) => {
  if (quotations.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No quotations available for comparison.
        </p>
      </div>
    );
  }

  const sortedQuotations = [...quotations].sort((a, b) => a.quotationAmount - b.quotationAmount);
  const lowestAmount = sortedQuotations[0]?.quotationAmount;

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Best Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedQuotations.map((quotation) => {
              const isBest = quotation.quotationAmount === lowestAmount;
              return (
                <tr 
                  key={quotation._id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    isBest ? 'bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {quotation.vendor?.vendorName || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {quotation.vendor?.companyName || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {quotation.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                      {quotation.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${
                      isBest ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      ${quotation.quotationAmount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <QuotationStatusBadge status={quotation.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(quotation.submissionDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isBest && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Best Value
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
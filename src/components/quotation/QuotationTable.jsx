import React from 'react';
import { FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import QuotationStatusBadge from './QuotationStatusBadge';
import { formatDate } from '../../utils/formatDate';

const QuotationTable = ({ quotations, onEdit, onDelete }) => {
  if (quotations.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No quotations found</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Vendor
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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {quotations.map((quotation) => (
              <tr key={quotation._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {quotation.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                    {quotation.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {quotation.vendor?.vendorName || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {quotation.vendor?.companyName || ''}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                  ${quotation.quotationAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <QuotationStatusBadge status={quotation.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(quotation.submissionDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/quotations/${quotation._id}`}
                      className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      title="View Details"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onEdit(quotation)}
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(quotation._id)}
                      className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotationTable;
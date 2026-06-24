import React from 'react';
import { FiAward, FiDollarSign, FiUser } from 'react-icons/fi';

const BestQuoteHighlight = ({ quotations }) => {
  if (quotations.length === 0) return null;

  const sortedQuotations = [...quotations].sort((a, b) => a.quotationAmount - b.quotationAmount);
  const bestQuote = sortedQuotations[0];
  const savings = sortedQuotations.length > 1 
    ? ((sortedQuotations[sortedQuotations.length - 1].quotationAmount - bestQuote.quotationAmount) / sortedQuotations[sortedQuotations.length - 1].quotationAmount * 100).toFixed(1)
    : 0;

  return (
    <div className="card border-2 border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-500/20 dark:bg-green-400/20">
            <FiAward className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Best Quotation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {bestQuote.vendor?.vendorName} - {bestQuote.vendor?.companyName}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${bestQuote.quotationAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiUser className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {bestQuote.title}
            </span>
          </div>
          {parseFloat(savings) > 0 && (
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Save {savings}% vs highest
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestQuoteHighlight;
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatsCard = ({ title, value, icon: Icon, color, change, changeType }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
      {change && (
        <div className="mt-2 flex items-center">
          {changeType === 'up' ? (
            <FiArrowUp className="text-green-500 mr-1" />
          ) : (
            <FiArrowDown className="text-red-500 mr-1" />
          )}
          <span className={`text-sm ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
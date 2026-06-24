import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const getActionColor = (action) => {
  const colors = {
    create: 'text-green-500',
    update: 'text-blue-500',
    delete: 'text-red-500',
    view: 'text-gray-500',
    approve: 'text-purple-500',
    reject: 'text-red-500',
    login: 'text-primary-500',
    logout: 'text-gray-500',
  };
  return colors[action] || 'text-gray-500';
};

const RecentActivity = ({ activities }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activities
      </h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="flex items-start space-x-3">
              <div className="flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <span className={getActionColor(activity.action)}>
                    {activity.action}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {activity.details}
                  </span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
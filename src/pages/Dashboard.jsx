import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../api/dashboardApi';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { FiUsers, FiFileText, FiClock, FiCheckCircle } from 'react-icons/fi';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const statCards = [
    {
      title: 'Total Vendors',
      value: stats?.totalVendors || 0,
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      // ✅ Fixed: activeQuotations (received + reviewed) instead of totalQuotations
      title: 'Active Quotations',
      value: stats?.activeQuotations || 0,
      icon: FiFileText,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Quotations',
      value: stats?.pendingQuotations || 0,
      icon: FiClock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Approved Quotations',
      value: stats?.approvedQuotations || 0,
      icon: FiCheckCircle,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here's what's happening with your vendors and quotations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>
        <div>
          <RecentActivity activities={stats?.recentActivities || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

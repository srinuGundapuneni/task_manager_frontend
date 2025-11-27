import React from 'react';
import { motion } from 'framer-motion';
import StatCard from './StatCard';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';

const Dashboard = ({ statistics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={statistics.total}
          icon={ListTodo}
          color="blue"
          delay={0}
        />
        <StatCard
          title="Completed"
          value={statistics.completed}
          icon={CheckCircle2}
          color="green"
          delay={0.1}
        />
        <StatCard
          title="In Progress"
          value={statistics.inProgress}
          icon={Clock}
          color="yellow"
          delay={0.2}
        />
        <StatCard
          title="Completion Rate"
          value={statistics.completedPercentage}
          icon={AlertCircle}
          color="purple"
          delay={0.3}
          suffix="%"
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;

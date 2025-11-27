import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: 'All', label: 'All Tasks', color: 'gray' },
    { value: 'Pending', label: 'Pending', color: 'yellow' },
    { value: 'In Progress', label: 'In Progress', color: 'blue' },
    { value: 'Completed', label: 'Completed', color: 'green' },
  ];

  const colorClasses = {
    gray: 'from-gray-500 to-gray-600',
    yellow: 'from-yellow-500 to-yellow-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <Filter className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Filter Tasks</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <motion.button
            key={filter.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter.value)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              activeFilter === filter.value
                ? `bg-gradient-to-r ${colorClasses[filter.color]} text-white shadow-lg`
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterBar;

import React from 'react';
import { motion } from 'framer-motion';
import { Circle, CheckCircle2, Clock, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const statusConfig = {
    'Pending': {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: Circle,
      iconColor: 'text-yellow-600'
    },
    'In Progress': {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Clock,
      iconColor: 'text-blue-600'
    },
    'Completed': {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle2,
      iconColor: 'text-green-600'
    }
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-4 mb-3 border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-500 mb-2">{task.description}</p>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`task-badge border ${config.color}`}>
              <StatusIcon size={14} className={config.iconColor} />
              {task.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const statuses = ['Pending', 'In Progress', 'Completed'];
              const currentIndex = statuses.indexOf(task.status);
              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
              onStatusChange(task.id, nextStatus);
            }}
            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
            title="Change Status"
          >
            <Clock size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Briefcase } from 'lucide-react';
import TaskItem from './TaskItem';

const EmployeeCard = ({ employee, filteredTasks, onStatusChange, onDeleteTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const taskCounts = {
    completed: employee.tasks.filter(t => t.status === 'Completed').length,
    inProgress: employee.tasks.filter(t => t.status === 'In Progress').length,
    pending: employee.tasks.filter(t => t.status === 'Pending').length,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="employee-card"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {employee.avatar}
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Briefcase size={14} />
              {employee.role}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                ✓ {taskCounts.completed}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                ⟳ {taskCounts.inProgress}
              </span>
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                ○ {taskCounts.pending}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gray-400" size={24} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <User size={18} />
                Tasks ({filteredTasks.length})
              </h4>
              
              {filteredTasks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No tasks match the current filter</p>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onStatusChange={(taskId, newStatus) =>
                        onStatusChange(employee.id, taskId, newStatus)
                      }
                      onDelete={(taskId) => onDeleteTask(employee.id, taskId)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmployeeCard;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FilterBar from './components/FilterBar';
import EmployeeCard from './components/EmployeeCard';
import AddTaskModal from './components/AddTaskModal';
import employeeService from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    completedPercentage: 0
  });
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load employees on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await employeeService.getEmployees();
      setEmployees(data);
      const stats = await employeeService.getStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleAddTask = async (taskData) => {
    try {
      await employeeService.addTaskToEmployee(taskData.employeeId, {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status
      });
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleStatusChange = async (employeeId, taskId, newStatus) => {
    try {
      await employeeService.updateTaskStatus(employeeId, taskId, newStatus);
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (employeeId, taskId) => {
    try {
      await employeeService.deleteTask(employeeId, taskId);
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getFilteredTasks = (tasks) => {
    if (activeFilter === 'All') return tasks;
    return tasks.filter(task => task.status === activeFilter);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw className="text-blue-600" size={48} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Dashboard statistics={statistics} />
        
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Team Members ({employees.length})
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-xl transition-all"
          >
            <Plus size={20} />
            Add Task
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {employees.map((employee) => {
            const filteredTasks = getFilteredTasks(employee.tasks);
            return (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                filteredTasks={filteredTasks}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center lg:hidden hover:shadow-3xl transition-all z-30"
      >
        <Plus size={28} />
      </motion.button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employees={employees}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;

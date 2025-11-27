import mockData from '../data/mockData.json';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EmployeeService {
  constructor() {
    this.employees = null;
  }

  // Fetch all employees (simulates API call)
  async fetchEmployees() {
    await delay(500); // Simulate network delay
    
    // Check localStorage first
    const cachedData = loadFromLocalStorage();
    if (cachedData) {
      this.employees = cachedData;
      return cachedData;
    }
    
    // Otherwise use mock data
    this.employees = mockData.employees;
    saveToLocalStorage(this.employees);
    return this.employees;
  }

  // Get all employees
  async getEmployees() {
    if (!this.employees) {
      await this.fetchEmployees();
    }
    return this.employees;
  }

  // Get employee by ID
  async getEmployeeById(id) {
    if (!this.employees) {
      await this.fetchEmployees();
    }
    return this.employees.find(emp => emp.id === id);
  }

  // Add task to employee
  async addTaskToEmployee(employeeId, task) {
    if (!this.employees) {
      await this.fetchEmployees();
    }
    
    const employee = this.employees.find(emp => emp.id === employeeId);
    if (employee) {
      const newTask = {
        id: Date.now().toString(),
        ...task,
        status: task.status || 'Pending'
      };
      employee.tasks.push(newTask);
      saveToLocalStorage(this.employees);
      return newTask;
    }
    throw new Error('Employee not found');
  }

  // Update task status
  async updateTaskStatus(employeeId, taskId, newStatus) {
    if (!this.employees) {
      await this.fetchEmployees();
    }
    
    const employee = this.employees.find(emp => emp.id === employeeId);
    if (employee) {
      const task = employee.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        saveToLocalStorage(this.employees);
        return task;
      }
    }
    throw new Error('Task not found');
  }

  // Delete task
  async deleteTask(employeeId, taskId) {
    if (!this.employees) {
      await this.fetchEmployees();
    }
    
    const employee = this.employees.find(emp => emp.id === employeeId);
    if (employee) {
      employee.tasks = employee.tasks.filter(t => t.id !== taskId);
      saveToLocalStorage(this.employees);
      return true;
    }
    return false;
  }

  // Get statistics
  async getStatistics() {
    if (!this.employees) {
      await this.fetchEmployees();
    }
    
    const allTasks = this.employees.flatMap(emp => emp.tasks);
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.status === 'Completed').length;
    const inProgress = allTasks.filter(t => t.status === 'In Progress').length;
    const pending = allTasks.filter(t => t.status === 'Pending').length;
    
    return {
      total,
      completed,
      inProgress,
      pending,
      completedPercentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
}

export default new EmployeeService();

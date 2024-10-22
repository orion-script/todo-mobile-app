const baseURL = "https://todo-33hzc3d83-orionscripts-projects.vercel.app";

export const endpoints = {
  register: `${baseURL}/auth/signup`,
  login: `${baseURL}/auth/login`,
  logout: `${baseURL}/auth/logout`,
  forgotPassword: `${baseURL}/auth/forgot-password`,
  getUsers: `${baseURL}/users`,
  gettodos: `${baseURL}/todos`,
  getProfile: `${baseURL}/users/profile`,
  updateProfile: `${baseURL}/users/profile`,
  createTodo: `${baseURL}/todos`,
  getTodo: `${baseURL}/todos`,
  updateTodo: `${baseURL}/todos`,
  markTodoAsCompleted: `${baseURL}/todos`,
  deleteTodo: `${baseURL}/todos`,
  soonToDueTodo: `${baseURL}/todos/due-soon`,
  searchTodo: `${baseURL}/todos/search`,
};

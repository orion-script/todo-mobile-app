export type Todo = {
  _id: string; // Unique identifier
  title: string; // Title of the todo
  description?: string; // Optional description
  status: "pending" | "completed"; // Status of the todo
  userId: string; // User ID associated with the todo
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
};

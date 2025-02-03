export type Priority = "low" | "medium" | "high"
export type Status = "todo" | "in-progress" | "done"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
 priority: "low" | "medium" | "high"
  assignee?: string
  dueDate?: Date
  createdAt: Date
  tags: string[]
  attachments: string[]
  comments: Comment[]
}

export interface Comment {
  id: string
  text: string
  userId: string
  createdAt: Date
}

export interface User {
  id: string
  name: string
  avatar?: string
  role: "admin" | "user"
}


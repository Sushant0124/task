"use client"

import { useState } from "react"
import { useTaskStore } from "../store/use-task-store"
import { TaskDialog } from "./task-dialog"
import { TaskFilters } from "./task-filters"  // Import the new component
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import type { Task } from "../lib/types"

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks)
  const searchQuery = useTaskStore((state) => state.searchQuery)
  const filterStatus = useTaskStore((state) => state.filterStatus)
  const filterPriority = useTaskStore((state) => state.filterPriority)
  const filterAssignee = useTaskStore((state) => state.filterAssignee)
  const filterTags = useTaskStore((state) => state.filterTags)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter tasks based on all criteria
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || task.status === filterStatus;
    const matchesPriority = !filterPriority || task.priority === filterPriority;
    const matchesAssignee = !filterAssignee || task.assignee === filterAssignee;
    const matchesTags = filterTags.length === 0 || 
      filterTags.every(tag => task.tags.includes(tag));

    return matchesSearch && matchesStatus && matchesPriority && 
           matchesAssignee && matchesTags;
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>
      </div>
      
      <TaskFilters /> 

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.assignee || "Unassigned"}</TableCell>
              <TableCell>
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredTasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No tasks match the current filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} task={editingTask} />
    </div>
  )
}
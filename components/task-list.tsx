"use client"

import { useState, useEffect } from "react"
import { useTaskStore } from "@/store/use-task-store"
import { TaskDialog } from "./task-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Task } from "@/lib/types"

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Ensure task details are properly loaded when dialog opens
  useEffect(() => {
    if (isDialogOpen === false) {
      setEditingTask(null) // Reset state when closing
    }
  }, [isDialogOpen])

  const handleEditTask = (task: Task) => {
    setEditingTask(task) // Store the task to be edited
    setIsDialogOpen(true) // Open the dialog
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>
      </div>
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
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.assignee || "Unassigned"}</TableCell>
              <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pass the correct task to TaskDialog */}
      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} task={editingTask} />
    </div>
  )
}

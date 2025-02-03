"use client"

import { useState } from "react"
import { format } from "date-fns"
import type { Task } from "../lib/types"
import { useTaskStore } from "../store/use-task-store"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Textarea } from "../components/ui/textarea"
import { Calendar, MoreVertical, MessageSquare, Paperclip, Tag } from "lucide-react"

interface TaskCardProps {
  task: Task
  onEdit: () => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const addComment = useTaskStore((state) => state.addComment)

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(task.id, {
        text: newComment,
        userId: "current-user", // Replace with actual user ID when available
      })
      setNewComment("")
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-muted-foreground">Created {format(new Date(task.createdAt), "PPP")}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">{task.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          {task.dueDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Due {format(new Date(task.dueDate), "PPP")}
            </div>
          )}
          {task.assignee && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{task.assignee.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{task.assignee}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => setShowComments(true)}>
            <MessageSquare className="h-4 w-4" />
            {task.comments.length}
          </Button>
          {task.attachments.length > 0 && (
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Paperclip className="h-4 w-4" />
              {task.attachments.length}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
            <DialogDescription>View and add comments for this task.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div key={comment.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{comment.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{comment.userId}</span>
                  <span className="text-sm text-muted-foreground">{format(new Date(comment.createdAt), "PPp")}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={handleAddComment}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

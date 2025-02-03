"use client"

import { useState, useMemo, useCallback } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
  min,
  max,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { useTaskStore } from "../store/use-task-store"
import type { Task } from "../lib/types"

export function TimelineDashboard() {
  const tasks = useTaskStore(useCallback((state) => state.tasks, []))

  // Ensure start date is at least today or the earliest task creation date
  const today = new Date()
  const startDate = useMemo(() => {
    if (tasks.length === 0) return today
    return min([today, ...tasks.map((task) => new Date(task.createdAt))])
  }, [tasks])

  // Determine the latest due date
  const endDate = useMemo(() => {
    if (tasks.length === 0) return today
    return max(tasks.map((task) => (task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt))))
  }, [tasks])

  // Generate timeline range dynamically
  const dates = useMemo(() => eachDayOfInterval({ start: startDate, end: endDate }), [startDate, endDate])

  // Organize tasks by assignee
  const tasksByAssignee = useMemo(() => {
    const groupedTasks: { [key: string]: Task[] } = {}
    tasks.forEach((task) => {
      if (!task.assignee) return
      if (!groupedTasks[task.assignee]) groupedTasks[task.assignee] = []
      groupedTasks[task.assignee].push(task)
    })
    return groupedTasks
  }, [tasks])

  // Render individual task bars in the timeline
  const renderTask = useCallback((task: Task, dates: Date[]) => {
    const taskStart = max([new Date(task.createdAt), dates[0]]) // Ensure it starts within range
    const taskEnd = task.dueDate ? min([new Date(task.dueDate), dates[dates.length - 1]]) : dates[dates.length - 1]

    if (!isWithinInterval(taskStart, { start: dates[0], end: dates[dates.length - 1] }) &&
        !isWithinInterval(taskEnd, { start: dates[0], end: dates[dates.length - 1] })) {
      return null
    }

    const startDayIndex = dates.findIndex((date) => date.toDateString() === taskStart.toDateString())
    const endDayIndex = dates.findIndex((date) => date.toDateString() === taskEnd.toDateString())

    const width = `${((endDayIndex - startDayIndex + 1) / dates.length) * 100}%`
    const left = `${(startDayIndex / dates.length) * 100}%`

    return (
      <div
        key={task.id}
        className={`absolute h-6 flex items-center justify-center rounded-full px-3 text-xs font-medium whitespace-nowrap ${
          task.priority === "high" ? "bg-red-500 text-white" :
          task.priority === "medium" ? "bg-yellow-400 text-black" :
          "bg-green-500 text-white"
        }`}
        style={{
          left,
          width,
        }}
        title={`${task.title} (${format(taskStart, "MMM d")} - ${format(taskEnd, "MMM d")})`}
      >
        {task.title}
      </div>
    )
  }, [])

  return (
    <div className="w-full overflow-x-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Timeline Dashboard</h2>

      <div className="min-w-[800px]">
        {/* Timeline Header */}
        <div className="grid grid-cols-[200px_1fr] mb-4 border-b pb-2">
          <div className="font-medium">Assignee</div>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${dates.length}, minmax(30px, 1fr))` }}>
            {dates.map((date) => (
              <div key={date.toISOString()} className="text-center text-sm text-muted-foreground">
                {date.getDate() === 1 && <div className="font-semibold">{format(date, "MMM")}</div>}
                {format(date, "d")}
              </div>
            ))}
          </div>
        </div>

        {/* Assignees and Their Tasks */}
        <div className="space-y-4">
          {Object.entries(tasksByAssignee).map(([assignee, assigneeTasks]) => (
            <div key={assignee} className="grid grid-cols-[200px_1fr] items-center">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{assignee[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{assignee}</span>
              </div>
              <div className="relative h-10 border-l">{assigneeTasks.map((task) => renderTask(task, dates))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useMemo, useCallback } from "react"
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core"
import { useTaskStore } from "@/store/use-task-store"
import { TaskColumn } from "./task-column"
import type { Task } from "@/lib/types"

const columns: { id: Task["status"]; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
]

export function Board() {
  const tasks = useTaskStore(useCallback((state) => state.tasks, []))
  const updateTask = useTaskStore(useCallback((state) => state.updateTask, []))

  const tasksByStatus = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc[column.id] = tasks.filter((task) => task.status === column.id)
        return acc
      },
      {} as Record<Task["status"], Task[]>,
    )
  }, [tasks])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as Task["status"]

      const activeTask = tasks.find((task) => task.id === activeId)
      if (activeTask && activeTask.status !== overId) {
        updateTask(activeId, { status: overId })
      }
    },
    [tasks, updateTask],
  )

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {columns.map((column) => (
          <TaskColumn key={column.id} id={column.id} title={column.title} tasks={tasksByStatus[column.id]} />
        ))}
      </div>
    </DndContext>
  );
  
}


import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TaskCard } from "./task-card"
import type { Task, Status } from "@/lib/types"
import { memo } from "react"

interface TaskColumnProps {
  id: Status
  title: string
  tasks: Task[]
}

export const TaskColumn = memo(function TaskColumn({ id, title, tasks }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="flex flex-col rounded-lg border bg-muted/50 p-4 min-h-[100px]">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={() => { /* handle edit */ }} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
  
})


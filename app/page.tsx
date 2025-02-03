"use client"

import { useState } from "react"
import { Board } from "@/components/board"
import { TaskFilters } from "@/components/task-filters"
import {TimelineDashboard} from "@/components/timeline-dashboard"
import { TaskList } from "@/components/task-list"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [view, setView] = useState<"board" | "timeline" | "list">("board")

  return (
    <main className="container mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <div className="space-x-2">
          <Button variant={view === "board" ? "default" : "outline"} onClick={() => setView("board")}>
            Board
          </Button>
          <Button variant={view === "timeline" ? "default" : "outline"} onClick={() => setView("timeline")}>
            Timeline
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}>
            List
          </Button>
        </div>
      </div>
      <TaskFilters />
      {view === "board" && <Board />}
      {view === "timeline" && <TimelineDashboard />}
      {view === "list" && <TaskList />}
    </main>
  )
}


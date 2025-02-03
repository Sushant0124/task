import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Priority, Status } from "@/lib/types";

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  filterStatus: Status | null;
  filterPriority: Priority | null;
  filterAssignee: string | null;
  filterTags: string[];
  sortBy: keyof Task;
  sortDirection: "asc" | "desc";
  view: "board" | "timeline" | "list";
}

interface TaskActions {
  addTask: (task: Omit<Task, "id" | "createdAt" | "comments">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: Status | null) => void;
  setFilterPriority: (priority: Priority | null) => void;
  setFilterAssignee: (assignee: string | null) => void;
  addFilterTag: (tag: string) => void;
  removeFilterTag: (tag: string) => void;
  setSortBy: (field: keyof Task) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  setView: (view: TaskState["view"]) => void;
  addComment: (taskId: string, comment: Omit<Task["comments"][number], "id" | "createdAt">) => void;
}

export const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchQuery: "",
      filterStatus: null,
      filterPriority: null,
      filterAssignee: null,
      filterTags: [],
      sortBy: "createdAt",
      sortDirection: "desc",
      view: "board",

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              tags: task.tags || [],
              attachments: task.attachments || [],
              comments: [],
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),

      addComment: (taskId, comment) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  comments: [
                    ...task.comments,
                    {
                      ...comment,
                      id: crypto.randomUUID(),
                      createdAt: new Date(),
                    },
                  ],
                }
              : task
          ),
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterStatus: (status) => set({ filterStatus: status }),
      setFilterPriority: (priority) => set({ filterPriority: priority }),
      setFilterAssignee: (assignee) => set({ filterAssignee: assignee }),

      addFilterTag: (tag) =>
        set((state) => ({
          filterTags: [...state.filterTags, tag],
        })),

      removeFilterTag: (tag) =>
        set((state) => ({
          filterTags: state.filterTags.filter((t) => t !== tag),
        })),

      setSortBy: (field) => set({ sortBy: field }),
      setSortDirection: (direction) => set({ sortDirection: direction }),
      setView: (view) => set({ view }),
    }),
    {
      name: "task-store",
    }
  )
);
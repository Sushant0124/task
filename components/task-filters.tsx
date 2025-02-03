// "use client"

// import { X } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { useTaskStore } from "@/store/use-task-store"
// import type { Task } from "@/lib/types"

// export function TaskFilters() {
//   const {
//     searchQuery,
//     filterStatus,
//     filterPriority,
//     filterAssignee,
//     filterTags,
//     sortBy,
//     sortDirection,
//     view,
//     setSearchQuery,
//     setFilterStatus,
//     setFilterPriority,
//     setFilterAssignee,
//     addFilterTag,
//     removeFilterTag,
//     setSortBy,
//     setSortDirection,
//     setView,
//   } = useTaskStore()

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap items-center gap-4">
//         <Input
//           placeholder="Search tasks..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-xs"
//         />
//         <Select value={view} onValueChange={(value: any) => setView(value)}>
//           <SelectTrigger className="w-[150px]">
//             <SelectValue placeholder="View" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="board">Board</SelectItem>
//             <SelectItem value="timeline">Timeline</SelectItem>
//             <SelectItem value="list">List</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="flex flex-wrap gap-4">
//         <Select
//           value={filterStatus || "all"}
//           onValueChange={(value) => setFilterStatus(value === "all" ? null : (value as Task["status"]))}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="todo">To Do</SelectItem>
//             <SelectItem value="in-progress">In Progress</SelectItem>
//             <SelectItem value="done">Done</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select
//           value={filterPriority || "all"}
//           onValueChange={(value) => setFilterPriority(value === "all" ? null : (value as Task["priority"]))}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by priority" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Priorities</SelectItem>
//             <SelectItem value="low">Low</SelectItem>
//             <SelectItem value="medium">Medium</SelectItem>
//             <SelectItem value="high">High</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select
//           value={filterAssignee || "all"}
//           onValueChange={(value) => setFilterAssignee(value === "all" ? null : value)}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Filter by assignee" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Assignees</SelectItem>
//             <SelectItem value="user1">User 1</SelectItem>
//             <SelectItem value="user2">User 2</SelectItem>
//             <SelectItem value="user3">User 3</SelectItem>
//           </SelectContent>
//         </Select>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline">Sort By</Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuLabel>Sort Field</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuCheckboxItem checked={sortBy === "createdAt"} onCheckedChange={() => setSortBy("createdAt")}>
//               Created Date
//             </DropdownMenuCheckboxItem>
//             <DropdownMenuCheckboxItem checked={sortBy === "dueDate"} onCheckedChange={() => setSortBy("dueDate")}>
//               Due Date
//             </DropdownMenuCheckboxItem>
//             <DropdownMenuCheckboxItem checked={sortBy === "priority"} onCheckedChange={() => setSortBy("priority")}>
//               Priority
//             </DropdownMenuCheckboxItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuLabel>Direction</DropdownMenuLabel>
//             <DropdownMenuCheckboxItem
//               checked={sortDirection === "asc"}
//               onCheckedChange={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
//             >
//               Ascending
//             </DropdownMenuCheckboxItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {filterTags.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {filterTags.map((tag) => (
//             <Badge key={tag} variant="secondary">
//               {tag}
//               <Button variant="ghost" size="icon" className="ml-1 h-4 w-4 p-0" onClick={() => removeFilterTag(tag)}>
//                 <X className="h-3 w-3" />
//               </Button>
//             </Badge>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


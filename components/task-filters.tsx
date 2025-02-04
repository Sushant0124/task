import React from 'react';
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/use-task-store";
import type { Priority, Status } from "@/lib/types";

export function TaskFilters() {
  const {
    searchQuery,
    filterStatus,
    filterPriority,
    filterAssignee,
    filterTags,
    setSearchQuery,
    setFilterStatus,
    setFilterPriority,
    setFilterAssignee,
    removeFilterTag
  } = useTaskStore();

  const activeFilters = React.useMemo(() => {
    const filters = [];
    if (filterStatus) filters.push({ type: 'status', value: filterStatus });
    if (filterPriority) filters.push({ type: 'priority', value: filterPriority });
    if (filterAssignee) filters.push({ type: 'assignee', value: filterAssignee });
    return filters;
  }, [filterStatus, filterPriority, filterAssignee]);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Select 
          value={filterStatus || "all"}
          onValueChange={(value) => setFilterStatus(value === "all" ? null : value as Status)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filterPriority || "all"}
          onValueChange={(value) => setFilterPriority(value === "all" ? null : value as Priority)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* <Select 
          value={filterAssignee || "all"}
          onValueChange={(value) => setFilterAssignee(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            <SelectItem value="user1">John Doe</SelectItem>
            <SelectItem value="user2">Jane Smith</SelectItem>
            <SelectItem value="user3">Bob Johnson</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {(activeFilters.length > 0 || filterTags.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter.type} variant="secondary">
              {`${filter.type}: ${filter.value}`}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-1 h-4 w-4 p-0"
                onClick={() => {
                  switch (filter.type) {
                    case 'status':
                      setFilterStatus(null);
                      break;
                    case 'priority':
                      setFilterPriority(null);
                      break;
                    case 'assignee':
                      setFilterAssignee(null);
                      break;
                  }
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filterTags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {`tag: ${tag}`}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-1 h-4 w-4 p-0"
                onClick={() => removeFilterTag(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
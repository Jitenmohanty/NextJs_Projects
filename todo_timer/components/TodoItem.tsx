import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash, Tag, Repeat } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TodoItemProps = {
  todo: {
    id: number
    text: string
    deadline?: Date
    isEditing: boolean
    priority: 'low' | 'medium' | 'high'
    tags: string[]
    recurrence?: 'daily' | 'weekly' | 'monthly'
  }
  onEdit: (id: number, newText: string) => void
  onDelete: (id: number) => void
  onSetDeadline: (id: number, deadline: string) => void
  onSetPriority: (id: number, priority: 'low' | 'medium' | 'high') => void
  onSetTags: (id: number, tags: string[]) => void
  onSetRecurrence: (id: number, recurrence: 'daily' | 'weekly' | 'monthly' | undefined) => void
}

export function TodoItem({ todo, onEdit, onDelete, onSetDeadline, onSetPriority, onSetTags, onSetRecurrence }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(todo.isEditing)
  const [newTag, setNewTag] = useState('')

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onEdit(todo.id, e.target.value)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEdit(todo.id, (e.target as HTMLInputElement).value)
      setIsEditing(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !todo.tags.includes(newTag.trim())) {
      onSetTags(todo.id, [...todo.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    onSetTags(todo.id, todo.tags.filter(t => t !== tag))
  }

  return (
    <Card className="border-dashed border-2 border-gray-300 p-4">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <Input
            type="text"
            defaultValue={todo.text}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        ) : (
          <div className="flex items-center space-x-2">
            <p className="text-lg">{todo.text}</p>
            {todo.deadline && (
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(todo.deadline), { addSuffix: true })}
              </div>
            )}
          </div>
        )}
        <div className="flex space-x-2">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button variant="destructive" onClick={() => onDelete(todo.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {!isEditing && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor={`deadline-${todo.id}`}>Deadline</Label>
            <Input
              id={`deadline-${todo.id}`}
              type="datetime-local"
              onChange={(e) => onSetDeadline(todo.id, e.target.value)}
              value={todo.deadline ? new Date(todo.deadline.getTime() - (todo.deadline.getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label>Priority</Label>
            <Select value={todo.priority} onValueChange={(value: 'low' | 'medium' | 'high') => onSetPriority(todo.id, value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Label>Recurrence</Label>
            <Select value={todo.recurrence} onValueChange={(value) => onSetRecurrence(todo.id, value as 'daily' | 'weekly' | 'monthly' | undefined)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {todo.tags.map((tag) => (
                <div key={tag} className="flex items-center bg-gray-100 px-2 py-1 rounded">
                  <span className="text-sm">{tag}</span>
                  <button onClick={() => removeTag(tag)} className="ml-1 text-red-500">
                    &times;
                  </button>
                </div>
              ))}
              <Input
                type="text"
                placeholder="Add tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="w-24"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

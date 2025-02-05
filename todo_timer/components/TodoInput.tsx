import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Plus, Mic } from "lucide-react"

interface TodoInputProps {
  newTodo: string
  isListening: boolean
  onAddTodo: () => void
  onSetNewTodo: (value: string) => void
  onStartListening: () => void
}

export function TodoInput({ newTodo, isListening, onAddTodo, onSetNewTodo, onStartListening }: TodoInputProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => onSetNewTodo(e.target.value)}
        className="flex-1"
      />
      <Button onClick={onAddTodo} disabled={!newTodo.trim()}>
        <Plus className="mr-2 h-4 w-4" /> Add
      </Button>
      <Button onClick={onStartListening} disabled={isListening}>
        <Mic className="mr-2 h-4 w-4" /> {isListening ? 'Listening...' : 'Voice'}
      </Button>
    </div>
  )
}
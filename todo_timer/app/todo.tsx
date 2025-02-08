"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Plus, Mic } from "lucide-react"
import { addDays, addWeeks, addMonths } from 'date-fns'
import { TodoItem } from '@/components/TodoItem'



declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = any;

type Todo = {
  id: number
  text: string
  deadline?: Date
  isEditing: boolean
  priority: 'low' | 'medium' | 'high'
  tags: string[] // Add tags field
  recurrence?: 'daily' | 'weekly' | 'monthly' // Add recurrence field
}



export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setNewTodo(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      setRecognition(recognition)
    }
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodos = [...todos, {
        id: Date.now(),
        text: newTodo,
        isEditing: false,
        priority: 'medium' as 'medium',
        tags: [],
      }]
      setTodos(newTodos)
      setNewTodo('')
    }
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const setDeadline = (id: number, deadline: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, deadline: new Date(deadline) } : todo))
  }

  const setPriority = (id: number, priority: 'low' | 'medium' | 'high') => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, priority } : todo))
  }

  const setTags = (id: number, tags: string[]) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, tags } : todo))
  }

  const setRecurrence = (id: number, recurrence: 'daily' | 'weekly' | 'monthly' | undefined) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, recurrence } : todo))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={startListening}
              disabled={isListening}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={addTodo} disabled={!newTodo.trim()}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={updateTodo}
                onDelete={deleteTodo}
                onSetDeadline={setDeadline}
                onSetPriority={setPriority}
                onSetTags={setTags}
                onSetRecurrence={setRecurrence}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
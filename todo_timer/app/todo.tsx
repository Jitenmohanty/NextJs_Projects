"use client"
import { useState, useEffect } from 'react'

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = any;
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash, Plus, Mic } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'

export default function TodoApp() {
  const [todos, setTodos] = useState<{ id: number, text: string, deadline?: Date, isEditing: boolean }[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

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

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, isEditing: false }])
      setNewTodo('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText, isEditing: false } : todo))
  }

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const toggleEdit = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
  }

  const setDeadline = (id: number, deadline: Date) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, deadline } : todo))
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
            <Button onClick={addTodo} disabled={!newTodo.trim()}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
            <Button onClick={startListening} disabled={isListening}>
              <Mic className="mr-2 h-4 w-4" /> {isListening ? 'Listening...' : 'Voice'}
            </Button>
          </div>
          <div className="space-y-4">
            {todos.map(todo => (
              <Card key={todo.id} className="border-dashed border-2 border-gray-300 p-4">
                <div className="flex justify-between items-center">
                  {todo.isEditing ? (
                    <Input
                      type="text"
                      value={todo.text}
                      onChange={(e) => updateTodo(todo.id, e.target.value)}
                      onBlur={() => toggleEdit(todo.id)}
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-lg">{todo.text}</p>
                      {todo.deadline && (
                        <div className="text-sm text-gray-500">
                          {formatDistanceToNow(todo.deadline, { addSuffix: true })}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex space-x-2">
                    {!todo.isEditing && (
                      <Button variant="outline" onClick={() => toggleEdit(todo.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {!todo.isEditing && (
                  <div className="mt-2">
                    <Label htmlFor={`deadline-${todo.id}`}>Set Deadline</Label>
                    <Input
                      id={`deadline-${todo.id}`}
                      type="datetime-local"
                      onChange={(e) => setDeadline(todo.id, new Date(e.target.value))}
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
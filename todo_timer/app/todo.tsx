"use client"
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash, Plus, Mic, Bell } from "lucide-react"
import { formatDistanceToNow, isPast, addMinutes } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = any;

interface Todo {
  id: number
  text: string
  deadline?: Date
  isEditing: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [alarmTodo, setAlarmTodo] = useState<{ id: number; text: string } | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load todos from local storage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos, (key, value) => {
        if (key === 'deadline' && value) {
          return new Date(value)
        }
        return value
      })
      setTodos(parsedTodos)
    }
  }, [])

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Check for deadlines every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const expiredTodo = todos.find(todo => 
        todo.deadline && isPast(todo.deadline) && !todo.isEditing
      )

      if (expiredTodo && (!alarmTodo || alarmTodo.id !== expiredTodo.id)) {
        setAlarmTodo({ id: expiredTodo.id, text: expiredTodo.text })
        if (audioRef.current) {
          audioRef.current.play()
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [todos, alarmTodo])

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

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodos = [...todos, { 
        id: Date.now(), 
        text: newTodo, 
        isEditing: false,
        priority: 'medium' as 'medium'
      }]
      setTodos(newTodos)
      setNewTodo('')
    }
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  // Update todo text
  const updateTodo = (id: number, newText: string) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    )
    setTodos(newTodos)
  }

  // Start voice input
  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  // Toggle edit mode for a todo
  const toggleEdit = (id: number) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    )
    setTodos(newTodos)
  }

  // Set deadline for a todo
  const setDeadline = (id: number, deadline: string) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, deadline: new Date(deadline) } : todo
    )
    setTodos(newTodos)
  }

  // Set priority for a todo
  const setPriority = (id: number, priority: 'low' | 'medium' | 'high') => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    )
    setTodos(newTodos)
  }

  // Handle closing the alarm
  const handleCloseAlarm = () => {
    setAlarmTodo(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  // Handle snooze
  const handleSnooze = () => {
    if (alarmTodo) {
      const newDeadline = addMinutes(new Date(), 5) // Snooze for 5 minutes
      setTodos(todos.map(todo => 
        todo.id === alarmTodo.id ? { ...todo, deadline: newDeadline } : todo
      ))
      handleCloseAlarm()
    }
  }

  // Handle OK (remove todo)
  const handleOK = () => {
    if (alarmTodo) {
      deleteTodo(alarmTodo.id)
      handleCloseAlarm()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Alarm Notification */}
      {alarmTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Alarm!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Todo: {alarmTodo.text}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleSnooze}>
                <Bell className="mr-2 h-4 w-4" /> Snooze
              </Button>
              <Button onClick={handleOK}>OK</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Audio element for alarm */}
      <audio ref={audioRef} src="/alarm.mp3" loop />

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
                      defaultValue={todo.text}
                      onBlur={(e) => updateTodo(todo.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateTodo(todo.id, (e.target as HTMLInputElement).value)
                        }
                      }}
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
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`deadline-${todo.id}`}>Deadline</Label>
                      <Input
                        id={`deadline-${todo.id}`}
                        type="datetime-local"
                        onChange={(e) => setDeadline(todo.id, e.target.value)}
                        value={todo.deadline ? new Date(todo.deadline.getTime() - (todo.deadline.getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label>Priority</Label>
                      <Select value={todo.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(todo.id, value)}>
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
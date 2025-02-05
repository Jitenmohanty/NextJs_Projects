"use client"
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { isPast, addMinutes } from 'date-fns'
import { AlarmNotification } from '@/components/AlarmNotification'
import { TodoInput } from '@/components/TodoInput'
import { TodoItem } from '@/components/TodoItem'

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

export default function App() {
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
      const newTodos: Todo[] = [...todos, { 
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
        <AlarmNotification
          alarmTodo={alarmTodo}
          onSnooze={handleSnooze}
          onOK={handleOK}
        />
      )}

      {/* Audio element for alarm */}
      <audio ref={audioRef} src="/alarm.mp3" loop />

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoInput
            newTodo={newTodo}
            isListening={isListening}
            onAddTodo={addTodo}
            onSetNewTodo={setNewTodo}
            onStartListening={startListening}
          />
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={updateTodo}
                onDelete={deleteTodo}
                onSetDeadline={setDeadline}
                onSetPriority={setPriority}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
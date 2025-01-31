'use client'

import { useState, useEffect } from 'react'
import { Bell, Plus, Pencil, Trash2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Previous helper functions remain the same
const getEncouragingMessage = () => {
  const messages = [
    "Medicine is your daily dose of wellness. Take it with positivity!",
    "Every pill is a step towards better health. Keep going!",
    "Your health is an investment, not an expense. Take your medicine on time!",
    "A moment for your medicine, a lifetime of good health!",
    "Taking medicine regularly keeps the doctor's visits away!",
    "Your well-being matters. Don't skip this important medicine!",
    "Stay committed to your health journey. Take your medicine now!",
    "Good health is a choice. You're making the right one by taking your medicine!",
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

const getMedicineTakingTips = (quantity) => {
  const tips = [
    "Take with a full glass of water",
    "Best taken after meals",
    "Ensure you're sitting upright while taking medicine",
    "Don't lie down immediately after taking medicine",
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

export default function Home() {
  // Previous state declarations remain the same
  const [medicines, setMedicines] = useState([])
  const [medicineName, setMedicineName] = useState('')
  const [medicineTime, setMedicineTime] = useState('')
  const [medicineQuantity, setMedicineQuantity] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState(false)
  const { toast } = useToast()

  // Request notification permissions when component mounts
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (!("Notification" in window)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "This browser does not support notifications"
        })
        return
      }

      try {
        const permission = await Notification.requestPermission()
        setNotificationPermission(permission === "granted")
        
        if (permission === "granted") {
          toast({
            title: "Notifications Enabled",
            description: "You will receive notifications for your medicine reminders"
          })
        } else {
          toast({
            variant: "destructive",
            title: "Notifications Disabled",
            description: "Please enable notifications to receive medicine reminders"
          })
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error)
      }
    }

    requestNotificationPermission()
  }, [])

  // Previous useEffect for loading medicines remains the same
  useEffect(() => {
    try {
      const savedMedicines = localStorage.getItem('medicines')
      if (savedMedicines) {
        setMedicines(JSON.parse(savedMedicines))
      }
    } catch (error) {
      console.error('Error loading medicines:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load saved medicines"
      })
    }
  }, [])

  // Updated medicine time check with proper notification
  useEffect(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
    audio.preload = 'auto'

    const checkMedicineTime = setInterval(() => {
      const now = new Date()
      const currentTime = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })

      medicines.forEach(medicine => {
        if (medicine.time === currentTime && !medicine.taken) {
          // Play sound
          audio.currentTime = 0
          audio.play().catch(error => {
            console.error('Error playing alarm:', error)
          })
          
          // Show both toast and browser notification
          showNotification(medicine)
          
          // Show browser notification if permitted
          if (notificationPermission) {
            const encouragingMessage = getEncouragingMessage()
            const takingTip = getMedicineTakingTips(medicine.quantity)
            
            new Notification("Medicine Reminder", {
              body: `Time to take ${medicine.quantity} of ${medicine.name}\n\nTip: ${takingTip}\n\n${encouragingMessage}`,
              icon: "/medicine-icon.png", // Add an icon path if you have one
              requireInteraction: true
            })
          }
        }
      })
    }, 1000)

    return () => {
      clearInterval(checkMedicineTime)
      audio.pause()
      audio.src = ''
    }
  }, [medicines, notificationPermission])

  const showNotification = (medicine) => {
    const encouragingMessage = getEncouragingMessage()
    const takingTip = getMedicineTakingTips(medicine.quantity)

    toast({
      title: "🔔 Medicine Time!",
      description: (
        <div className="space-y-2">
          <p className="font-medium">
            Time to take {medicine.quantity} of {medicine.name}
          </p>
          <p className="text-sm text-muted-foreground">
            💡 Tip: {takingTip}
          </p>
          <p className="text-sm italic text-muted-foreground">
            "{encouragingMessage}"
          </p>
        </div>
      ),
      duration: 15000, // Show for 15 seconds
      action: (
        <Button variant="outline" onClick={() => markAsTaken(medicine.id)}>
          Mark as Taken
        </Button>
      ),
    })
  }

  const saveMedicine = () => {
    try {
      if (!medicineName || !medicineTime || !medicineQuantity) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill all fields"
        })
        return
      }

      const newMedicine = {
        id: editingId || Date.now(),
        name: medicineName.trim(),
        time: medicineTime,
        quantity: medicineQuantity.trim(),
        taken: false
      }

      const updatedMedicines = editingId 
        ? medicines.map(m => m.id === editingId ? newMedicine : m)
        : [...medicines, newMedicine]

      setMedicines(updatedMedicines)
      localStorage.setItem('medicines', JSON.stringify(updatedMedicines))
      
      resetForm()
      setIsDialogOpen(false)

      toast({
        title: editingId ? "Medicine Updated" : "Medicine Added",
        description: `${newMedicine.name} scheduled for ${newMedicine.time}`
      })
    } catch (error) {
      console.error('Error saving medicine:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save medicine"
      })
    }
  }

  const editMedicine = (medicine) => {
    setEditingId(medicine.id)
    setMedicineName(medicine.name)
    setMedicineTime(medicine.time)
    setMedicineQuantity(medicine.quantity)
    setIsDialogOpen(true)
  }

  const deleteMedicine = (id) => {
    try {
      const updatedMedicines = medicines.filter(m => m.id !== id)
      setMedicines(updatedMedicines)
      localStorage.setItem('medicines', JSON.stringify(updatedMedicines))
      
      toast({
        title: "Medicine Deleted",
        description: "Medicine has been removed from your schedule"
      })
    } catch (error) {
      console.error('Error deleting medicine:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete medicine"
      })
    }
  }

  const markAsTaken = (id) => {
    try {
      const updatedMedicines = medicines.map(medicine => 
        medicine.id === id ? { ...medicine, taken: true } : medicine
      )
      setMedicines(updatedMedicines)
      localStorage.setItem('medicines', JSON.stringify(updatedMedicines))
      
      toast({
        title: "Marked as Taken",
        description: "Medicine has been marked as taken"
      })
    } catch (error) {
      console.error('Error marking medicine as taken:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark medicine as taken"
      })
    }
  }

  const resetForm = () => {
    setMedicineName('')
    setMedicineTime('')
    setMedicineQuantity('')
    setEditingId(null)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="w-8 h-8 text-blue-500" />
            Medicine Reminder
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Medicine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Medicine Name</Label>
                  <Input
                    id="name"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    placeholder="Enter medicine name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={medicineTime}
                    onChange={(e) => setMedicineTime(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    value={medicineQuantity}
                    onChange={(e) => setMedicineQuantity(e.target.value)}
                    placeholder="e.g., 1 pill"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button onClick={saveMedicine}>
                    {editingId ? 'Update Medicine' : 'Add Medicine'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {medicines.map(medicine => (
            <div
              key={medicine.id}
              className={`p-4 rounded-lg border ${
                medicine.taken 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-blue-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {medicine.name}
                  </h3>
                  <p className="text-gray-600">
                    Time: {medicine.time} | Quantity: {medicine.quantity}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!medicine.taken && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsTaken(medicine.id)}
                    >
                      Mark as Taken
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editMedicine(medicine)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteMedicine(medicine.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {medicines.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No medicines added yet. Click the "Add Medicine" button to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
"use client"
import React, { useState, useEffect } from 'react';
import { Bell, Check, Clock, AlertCircle, Plus, X, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MedicineReminder = () => {
  const [reminders, setReminders] = useState(() => {
    // Load reminders from localStorage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medicineReminders');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [activeAlarms, setActiveAlarms] = useState(new Set());
  const [formData, setFormData] = useState({
    medicine: '',
    dosage: '',
    time: '',
    instructions: '',
    priority: 'medium'
  });

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatTime(now));

      reminders.forEach(reminder => {
        if (reminder.time === formatTime(now) && !activeAlarms.has(reminder.id)) {
          triggerAlarm(reminder);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [reminders, activeAlarms]);

  const triggerAlarm = (reminder) => {
    setActiveAlarms(prev => new Set([...prev, reminder.id]));

    if (Notification.permission === "granted") {
      new Notification("Medicine Reminder!", {
        body: `Time to take ${reminder.medicine} - ${reminder.dosage}`,
        icon: "/medicine-icon.png"
      });
    }

    const audio = new Audio('/old_alarm_sound.mp3');
    audio.loop = true;
    audio.play().catch(e => console.log('Audio playback failed:', e));

    // Store audio element in a ref or another state to access it later
    setReminders(prev => prev.map(r =>
      r.id === reminder.id ? { ...r, audio } : r
    ));
  };

  // Function to stop alarm without deleting the reminder
  const stopAlarm = (id) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder?.audio) {
      reminder.audio.pause();
      reminder.audio.currentTime = 0;

      // Remove the audio reference
      setReminders(prev => prev.map(r =>
        r.id === id ? { ...r, audio: null } : r
      ));
    }

    setActiveAlarms(prev => {
      const newAlarms = new Set(prev);
      newAlarms.delete(id);
      return newAlarms;
    });
  };

  // Function to delete reminder
  const deleteReminder = (id) => {
    // First stop any active alarm
    stopAlarm(id);
    // Then remove the reminder
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReminder = {
      id: Date.now(),
      ...formData,
      status: 'pending'
    };

    setReminders(prev => [...prev, newReminder]);
    setFormData({
      medicine: '',
      dosage: '',
      time: '',
      instructions: '',
      priority: 'medium'
    });
    setIsAddingReminder(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Medicine Reminders
              <span className="text-sm font-normal text-gray-500">
                Current time: {currentTime}
              </span>
            </CardTitle>
            <button
              onClick={() => setIsAddingReminder(true)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              Add Reminder
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {reminders.length === 0 ? (
            <Alert>
              <AlertDescription>
                No medicine reminders scheduled. Click "Add Reminder" to create one.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {reminders.map(reminder => (
                <Card
                  key={reminder.id}
                  className={`${activeAlarms.has(reminder.id) ? 'border-red-500 shadow-lg animate-pulse' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{reminder.medicine}</h3>
                        <p className="text-sm text-gray-600">Time: {reminder.time}</p>
                        <p className="text-sm text-gray-600">Dosage: {reminder.dosage}</p>
                        {reminder.instructions && (
                          <p className="text-sm text-gray-600">{reminder.instructions}</p>
                        )}
                        <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 
                          ${reminder.priority === 'high' ? 'bg-red-100 text-red-800' :
                            reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'}`}
                        >
                          {reminder.priority} priority
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {activeAlarms.has(reminder.id) && (
                          <button
                            onClick={() => stopAlarm(reminder.id)}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isAddingReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                  <input
                    type="text"
                    name="medicine"
                    value={formData.medicine}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingReminder(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MedicineReminder;
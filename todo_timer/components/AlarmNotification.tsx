import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Bell } from "lucide-react"

interface AlarmNotificationProps {
  alarmTodo: { id: number; text: string }
  onSnooze: () => void
  onOK: () => void
}

export function AlarmNotification({ alarmTodo, onSnooze, onOK }: AlarmNotificationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Alarm!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Todo: {alarmTodo.text}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onSnooze}>
            <Bell className="mr-2 h-4 w-4" /> Snooze
          </Button>
          <Button onClick={onOK}>OK</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
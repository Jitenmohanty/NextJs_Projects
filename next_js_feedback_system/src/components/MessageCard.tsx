"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { Edit, X, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { MessageDocument } from "@/model/user.model";

type MessageCardProps = {
  message: MessageDocument;
  onMessageDelete: (messageId: string) => void;
  onMessageUpdate: (updatedMessage: MessageDocument) => void;
};

const MessageCard = ({
  message,
  onMessageDelete,
  onMessageUpdate,
}: MessageCardProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );

      toast({
        title: response.data.message,
      });
      onMessageDelete(String(message._id));
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast({
        title: "Error",
        description: "Message content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.put<ApiResponse & { data: MessageDocument }>(
        `/api/update-message/${message._id}`,
        {
          content: editedContent,
        }
      );

      toast({
        title: response.data.message,
      });
      
      if (response.data.data) {
        onMessageUpdate(response.data.data);
      }
      setIsEditing(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to update message",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          {isEditing ? (
            <div className="flex-1">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all duration-200"
                placeholder="Enter your message..."
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <Save size={16} />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <CardTitle className="text-lg font-medium text-gray-900 flex-1">
                {message.content}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Edit size={18} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X size={18} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white p-6 rounded-lg shadow-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                        Delete Message
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600">
                        Are you sure you want to delete this message? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel className="mr-2">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteConfirmation}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
      <CardContent />
    </Card>
  );
};

export default MessageCard;
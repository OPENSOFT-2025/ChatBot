
import React, { useState, useRef } from "react";
import { useChat } from "./ChatContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Paperclip, Image, Mic, Send, X } from "lucide-react";

const ChatInput: React.FC = () => {
  const { sendMessage } = useChat();
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      sendMessage(message, attachments);
      setMessage("");
      setAttachments([]);

      // Focus the textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);

      // Clear the input value so the same file can be selected again
      e.target.value = "";
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setAttachments((prev) => [...prev, file]);
        }
      }
    }
  };

  return (
    <div className="border-t border-border p-4 bg-background">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="relative group bg-secondary rounded-md p-2 flex items-center"
            >
              {file.type.startsWith("image/") ? (
                <div className="w-10 h-10 mr-2 relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 mr-2 flex items-center justify-center bg-background/50 rounded">
                  <Paperclip className="h-5 w-5" />
                </div>
              )}
              <div className="max-w-[120px]">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveAttachment(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="min-h-[60px] max-h-[200px] pr-10 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 h-6 w-6"
            onClick={() => {
              /* Emoji picker would go here */
            }}
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = "image/*";
                fileInputRef.current.click();
              }
            }}
          >
            <Image className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="bg-primary hover:bg-primary/90"
            onClick={handleSendMessage}
            disabled={!message.trim() && attachments.length === 0}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

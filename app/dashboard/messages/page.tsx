"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  content: string;
  timestamp: string;
  type: "sent" | "received";
}

interface Chat {
  id: number;
  customer: {
    name: string;
    avatar: string;
    initials: string;
  };
  messages: Message[];
  status: string;
  lastActive: string;
}

interface Chat {
  id: number;
  customer: {
    name: string;
    avatar: string;
    initials: string;
  };
  messages: Message[];
  status: string;
  lastActive: string;
}

const mockMessages: Chat[] = [
  {
    id: 1,
    customer: {
      name: "Amit Verma",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60",
      initials: "AV",
    },
    messages: [
      {
        content:
          "Hi, I need urgent help with my insurance claim. It’s been delayed for weeks!",
        timestamp: "10:30 AM",
        type: "received",
      },
      {
        content: "I'm sorry to hear that. Let me check the status for you.",
        timestamp: "10:32 AM",
        type: "sent",
      },
      {
        content:
          "This is really frustrating. I’ve called customer support twice already.",
        timestamp: "10:34 AM",
        type: "received",
      },
      {
        content:
          "I completely understand. Let me escalate this and get you an update right away.",
        timestamp: "10:36 AM",
        type: "sent",
      },
      {
        content: "I appreciate it. Please let me know as soon as possible.",
        timestamp: "10:38 AM",
        type: "received",
      },
      {
        content: "Of course! I just need your claim number to proceed.",
        timestamp: "10:40 AM",
        type: "sent",
      },
      {
        content: "Here it is: 987654XYZ.",
        timestamp: "10:41 AM",
        type: "received",
      },
      {
        content: "Thanks! Checking now...",
        timestamp: "10:42 AM",
        type: "sent",
      },
    ],
    status: "active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    customer: {
      name: "Sneha Kapoor",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
      initials: "SK",
    },
    messages: [
      {
        content:
          "Hey, I have a quick question about my health policy coverage.",
        timestamp: "11:15 AM",
        type: "received",
      },
      {
        content: "Sure! I'd be happy to help. What would you like to know?",
        timestamp: "11:16 AM",
        type: "sent",
      },
      {
        content: "Does my plan include annual check-ups?",
        timestamp: "11:17 AM",
        type: "received",
      },
      {
        content: "Yes, your policy covers one free check-up per year.",
        timestamp: "11:18 AM",
        type: "sent",
      },
      {
        content: "Alright, that’s good to know. Thanks for the info.",
        timestamp: "11:19 AM",
        type: "received",
      },
      {
        content: "You're welcome! Let me know if you need anything else.",
        timestamp: "11:20 AM",
        type: "sent",
      },
    ],
    status: "active",
    lastActive: "5 min ago",
  },
  {
    id: 3,
    customer: {
      name: "Rahul Mehta",
      avatar:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&auto=format&fit=crop&q=60",
      initials: "RM",
    },
    messages: [
      {
        content:
          "Hi! Just wanted to say the claim process was super smooth. Thanks a lot!",
        timestamp: "12:00 PM",
        type: "received",
      },
      {
        content: "That’s wonderful to hear! We’re happy to help.",
        timestamp: "12:02 PM",
        type: "sent",
      },
      {
        content:
          "I was worried it would take longer, but I got my reimbursement quickly.",
        timestamp: "12:03 PM",
        type: "received",
      },
      {
        content:
          "We always aim to process claims as fast as possible. Glad it worked out!",
        timestamp: "12:04 PM",
        type: "sent",
      },
      {
        content: "Great service! I'll recommend you to my friends.",
        timestamp: "12:05 PM",
        type: "received",
      },
      {
        content: "Thank you! We appreciate your support. 😊",
        timestamp: "12:06 PM",
        type: "sent",
      },
    ],
    status: "active",
    lastActive: "10 min ago",
  },
  {
    id: 4,
    customer: {
      name: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&auto=format&fit=crop&q=60",
      initials: "PS",
    },
    messages: [
      {
        content:
          "Hi, I just found out my claim was denied... I don’t know what to do.",
        timestamp: "01:15 PM",
        type: "received",
      },
      {
        content:
          "I’m so sorry to hear that. Let me check the details and see how we can help.",
        timestamp: "01:16 PM",
        type: "sent",
      },
      {
        content:
          "I really needed this reimbursement… It’s important for my medical bills.",
        timestamp: "01:17 PM",
        type: "received",
      },
      {
        content:
          "I understand. Let’s go through the reason for denial and appeal if possible.",
        timestamp: "01:18 PM",
        type: "sent",
      },
      {
        content: "That would mean a lot… Thank you.",
        timestamp: "01:19 PM",
        type: "received",
      },
      {
        content: "I’m here to help. Let’s get this sorted together.",
        timestamp: "01:20 PM",
        type: "sent",
      },
    ],
    status: "active",
    lastActive: "15 min ago",
  },
  {
    id: 5,
    customer: {
      name: "Rohan Singh",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&auto=format&fit=crop&q=60",
      initials: "RS",
    },
    messages: [
      {
        content: "I have received the details. I will review them.",
        timestamp: "02:16 PM",
        type: "received",
      },
      // Neutral message
    ],
    status: "active",
    lastActive: "20 min ago",
  },
];

export default function Messages() {
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState<Chat[]>(mockMessages);
  const [selectedChat, setSelectedChat] = useState<Chat>(mockMessages[0]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [loadingReplies, setLoadingReplies] = useState<boolean>(false);

  // Fetch sentiment analysis
  const getSentiment = async () => {
    setLoading(true);
    setSentiment(null);

    try {
      const chatHistory = selectedChat.messages
        .map((msg) => msg.content)
        .join(" ");
      if (!chatHistory) return;

      const response = await axios.post("/api/sentiment", {
        message: chatHistory,
      });

      if (response.data?.success && response.data.sentiment) {
        setSentiment(response.data.sentiment);
      }
    } catch (error) {
      console.error("Error fetching sentiment:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSmartReplies = async () => {
    setLoadingReplies(true);
    setSmartReplies([]);

    try {
      // Get the last received message
      const lastMessage = selectedChat.messages
        .filter((msg) => msg.type === "received")
        .at(-1)?.content;

      if (!lastMessage) return;

      const response = await axios.post("/api/smart-chat", {
        lastUserMessage: lastMessage,
      });

      console.log("API Response:", response.data); // Debugging log

      // Correcting the property name from `replies` to `smartReplies`
      if (response.data?.success && response.data.smartReplies) {
        setSmartReplies(response.data.smartReplies);
      }
    } catch (error) {
      console.error("Error fetching smart replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  };

  // Handle switching between conversations
  const handleChatSwitch = (chat: Chat) => {
    setSelectedChat(chat);
    setSentiment(null); // Reset sentiment on switching chat
    setSmartReplies([]); // Clear smart replies on switching chat
  };
  

  // Determine sentiment color
  const sentimentColor =
    sentiment === "POSITIVE"
      ? "text-green-600"
      : sentiment === "NEGATIVE"
      ? "text-red-600"
      : "text-gray-600"; // Neutral sentiment in gray

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {chatMessages.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b cursor-pointer transition-colors ${
                selectedChat.id === chat.id ? "bg-accent" : "hover:bg-accent"
              }`}
              onClick={() => handleChatSwitch(chat)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={chat.customer.avatar}
                    alt={chat.customer.name}
                  />
                  <AvatarFallback>{chat.customer.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{chat.customer.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastActive}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.messages.at(-1)?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-card flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src={selectedChat.customer.avatar}
                alt={selectedChat.customer.name}
              />
              <AvatarFallback>{selectedChat.customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedChat.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedChat.status}
              </p>
            </div>
          </div>

          {/* Get Sentiment Button */}
          <Button onClick={getSentiment} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Get Sentiment"
            )}
          </Button>
        </div>

        {/* Sentiment Display */}
        {sentiment && (
          <div className="p-3 text-center text-sm font-semibold bg-gray-100 border-b">
            Sentiment Analysis:{" "}
            <span className={sentimentColor}>{sentiment}</span>
          </div>
        )}

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedChat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === "sent"
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-card flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <Button onClick={fetchSmartReplies} className="bg-blue-600 hover:bg-blue-700">Get Smart Replies</Button>

          {loadingReplies ? (
            <p>Loading...</p>
          ) : (
            smartReplies.length > 0 && ( // ✅ Correct syntax
              <div className="p-3 border-t bg-gray-100">
                <p className="text-sm font-medium mb-2">Smart Replies:</p>
                <div className="flex gap-2 flex-wrap">
                  {smartReplies.map((reply, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg shadow-sm hover:bg-blue-200 transition text-sm"
                      onClick={() => setInputMessage(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

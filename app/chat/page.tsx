"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ChatMessage } from "./components/chat-message";
import { ChatInput } from "./components/chat-input";
import { Button } from "../_components/ui/button";

const INITIAL_MESSAGES = [
    {
        id: "system-welcome",
        role: "system" as const,
        parts: [
            {
                type: "text" as const,
                text: "Seu assistente de agendamentos está online.",
            },
        ],
    },
    {
        id: "assistant-welcome",
        role: "assistant" as const,
        parts: [
            {
                type: "text" as const,
                text: "Olá! Sou o Aparatus, seu assistente pessoal.\n\nEstou aqui para te auxiliar a agendar seu corte ou barba, encontrar as barbearias disponíveis perto de você e responder às suas dúvidas.",
            },
        ],
    },
];

export default function ChatPage() {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/chat",
        }),
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage({
                text: message,
            });
            setMessage("");
        }
    };

    const isLoading = status === "streaming" || status === "submitted";

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <header className="sticky top-0 z-50 border-b border-border bg-background">
                <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 md:px-6">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/">
                            <ChevronLeft className="size-6" />
                        </Link>
                    </Button>
                    <p className="font-merriweather text-xl leading-[1.4] tracking-[-1px] text-foreground italic md:text-2xl">
                        Aparatus
                    </p>
                    <div className="size-10" />
                </div>
            </header>

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
                <div className="flex-1 overflow-y-auto pb-32 [&::-webkit-scrollbar]:hidden">
                    {messages.length === 0
                        ? INITIAL_MESSAGES.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))
                        : messages.map((msg, index) => (
                            <ChatMessage
                                key={msg.id}
                                message={msg}
                                isStreaming={
                                    status === "streaming" && index === messages.length - 1
                                }
                            />
                        ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="mx-auto w-full max-w-4xl">
                    <ChatInput
                        input={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}
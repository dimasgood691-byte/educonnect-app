import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    Send,
    Sparkles,
    User,
    Copy,
    Check,
    Code2,
    BookOpen,
    HelpCircle,
    RotateCcw,
    Lightbulb,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { sendAiPrompt } from '../services/api';

const quickPrompts = [
    {
        icon: Code2,
        title: 'Jelaskan Kode & Bug',
        prompt: 'Bantu saya mencari tahu mengapa komponen React ini tidak melalukan re-render...',
    },
    {
        icon: BookOpen,
        title: 'Rangkum Materi',
        prompt: 'Rangkumkan poin-poin utama mengenai konsep State & Props dalam React JS.',
    },
    {
        icon: HelpCircle,
        title: 'Buatkan Soal Latihan',
        prompt: 'Buatkan 3 contoh soal pilihan ganda tentang penggunaan useEffect beserta kuncinya.',
    },
    {
        icon: Lightbulb,
        title: 'Tips & Study Plan',
        prompt: 'Bagaimana alur belajar yang efisien untuk menguasai Fullstack Web Development?',
    },
];

const initialMessages = [
    {
        id: 'msg-1',
        sender: 'ai',
        text: 'Halo Felix! 👋 Saya **EduAI Assistant** versi layar penuh.\n\nKamu bisa menanyakan konsep materi, analisis kode error, pembuatan ringkasan modul, hingga strategi belajar. Pilih topik cepat di atas atau langsung ketikkan pertanyaanmu!',
        time: 'Baru saja',
    },
];

export const AIAssistantPage = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (textToSend) => {
        const messageText = textToSend || inputMessage;
        if (!messageText.trim()) return;

        const userMsg = {
            id: `msg-${Date.now()}`,
            sender: 'user',
            text: messageText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInputMessage('');
        setIsTyping(true);

        try {
            const responseText = await sendAiPrompt(messageText);
            const aiMsg = {
                id: `msg-${Date.now() + 1}`,
                sender: 'ai',
                text: responseText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg = {
                id: `msg-${Date.now() + 1}`,
                sender: 'ai',
                text: 'Maaf, terjadi kesalahan saat mengambil jawaban AI. Silakan coba lagi nanti.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMsg]);
            console.error('AI Assistant error:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const generateResponse = (prompt) => {
        const lower = prompt.toLowerCase();
        if (lower.includes('state') || lower.includes('props')) {
            return '### Perbedaan State & Props di React:\n\n1. **State**: Data privat yang dikelola secara internal oleh komponen itu sendiri dan dapat berubah seiring waktu (`useState`).\n2. **Props**: Parameter/data yang ditransfer dari komponen induk (*parent*) ke komponen anak (*child*) dan sifatnya *read-only*.';
        } else if (lower.includes('re-render') || lower.includes('render')) {
            return 'Komponen React biasanya gagal melakukan *re-render* jika:\n- Mutation dilakukan secara langsung pada state (contoh: `state.push()`), bukan menggunakan setter function (`setState`).\n- Referensi objek/array tidak berubah saat di-update.';
        } else {
            return `Pertanyaan menarik tentang **"${prompt}"**!\n\nUntuk mendalami topik ini lebih lanjut, kamu juga bisa melihat modul pembelajaran di menu **Materi & Kursus** atau berdiskusi dengan teman-teman di **Forum Diskusi**.`;
        }
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleResetChat = () => {
        setMessages(initialMessages);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col h-[calc(100vh-7.5rem)] max-w-5xl mx-auto space-y-4">
                {/* Header Section */}
                <div className="flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary/20">
                            <Sparkles className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-dark tracking-tight flex items-center gap-2">
                                EduAI Study Assistant 🤖
                            </h1>
                            <p className="text-xs text-muted">
                                Asisten AI cerdas interaktif untuk mendampingi proses belajar kamu.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetChat}
                        className="gap-1.5 text-xs text-slate-600"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Sesi Baru
                    </Button>
                </div>

                {/* Quick Prompts Container */}
                {messages.length <= 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
                        {quickPrompts.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(item.prompt)}
                                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-primary hover:shadow-md transition-all text-left space-y-1.5 group"
                                >
                                    <div className="p-2 rounded-xl bg-primary/10 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-xs font-bold text-dark">{item.title}</h4>
                                    <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                                        {item.prompt}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Main Chat Area */}
                <Card className="flex-1 border-slate-200/80 flex flex-col overflow-hidden bg-white">
                    <CardContent className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                            >
                                {/* Avatar Icon */}
                                <div
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${msg.sender === 'user'
                                            ? 'bg-primary text-white'
                                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                                        }`}
                                >
                                    {msg.sender === 'user' ? (
                                        <User className="w-4 h-4" />
                                    ) : (
                                        <Bot className="w-4 h-4 text-primary" />
                                    )}
                                </div>

                                {/* Content Bubble */}
                                <div className="space-y-1 max-w-[85%] sm:max-w-[75%]">
                                    <div
                                        className={`p-4 rounded-2xl relative group text-xs leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-primary text-white rounded-tr-none'
                                                : 'bg-slate-50 border border-slate-200/80 text-dark rounded-tl-none'
                                            }`}
                                    >
                                        <p className="whitespace-pre-line">{msg.text}</p>

                                        {msg.sender === 'ai' && (
                                            <button
                                                onClick={() => handleCopy(msg.text, msg.id)}
                                                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-dark shadow-xs"
                                            >
                                                {copiedId === msg.id ? (
                                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                ) : (
                                                    <Copy className="w-3.5 h-3.5" />
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    <span
                                        className={`text-[10px] text-slate-400 block ${msg.sender === 'user' ? 'text-right' : 'text-left'
                                            }`}
                                    >
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3 items-center text-slate-400">
                                <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-primary" />
                                </div>
                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    {/* Form Input Message */}
                    <div className="p-3 sm:p-4 border-t border-slate-100 bg-white shrink-0">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Ketikkan pertanyaan, modul materi, atau kodingan kamu di sini..."
                                className="flex-1 px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                            />
                            <Button type="submit" disabled={!inputMessage.trim()} className="gap-2 px-5 py-3">
                                <Send className="w-4 h-4" />
                                <span className="hidden sm:inline">Kirim</span>
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default AIAssistantPage;
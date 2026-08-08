import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    ThumbsUp,
    Search,
    PlusCircle,
    X,
    Send,
    UserCheck,
    Tag,
    Clock,
    Filter,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import initialThreads from '../data/forum.json';

export const ForumPage = () => {
    const [threads, setThreads] = useState(initialThreads);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeThreadId, setActiveThreadId] = useState(null);

    // Form State New Thread
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Kejuruan RPL');
    const [newContent, setNewContent] = useState('');

    // Form State Reply
    const [replyContent, setReplyContent] = useState('');

    const categories = ['Semua', 'Kejuruan RPL', 'Umum', 'Diskusi Bebas'];

    const filteredThreads = threads.filter((thread) => {
        const matchesSearch =
            thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            thread.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'Semua' || thread.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleLike = (id) => {
        setThreads(
            threads.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
        );
    };

    const handleCreateThread = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;

        const newThread = {
            id: `thread-${Date.now()}`,
            author: 'Felix',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            role: 'Siswa',
            category: newCategory,
            title: newTitle,
            content: newContent,
            likes: 0,
            createdAt: 'Baru saja',
            replies: [],
        };

        setThreads([newThread, ...threads]);
        setNewTitle('');
        setNewContent('');
        setIsModalOpen(false);
    };

    const handleAddReply = (threadId) => {
        if (!replyContent.trim()) return;

        const newReply = {
            id: `reply-${Date.now()}`,
            author: 'Felix',
            role: 'Siswa',
            content: replyContent,
            createdAt: 'Baru saja',
            isTeacher: false,
        };

        setThreads(
            threads.map((t) =>
                t.id === threadId
                    ? { ...t, replies: [...t.replies, newReply] }
                    : t
            )
        );
        setReplyContent('');
    };

    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
                        Forum Diskusi Belajar 💬
                    </h1>
                    <p className="text-xs sm:text-sm text-muted">
                        Tanyakan kesulitan materi, diskusi tugas, dan saling berbagi ilmu dengan sesama siswa & guru.
                    </p>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="self-start sm:self-auto gap-2"
                >
                    <PlusCircle className="w-4 h-4" />
                    Buat Diskusi Baru
                </Button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari topik diskusi atau kata kunci..."
                        className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary shadow-xs transition-all"
                    />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start md:self-auto overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? 'bg-white text-primary shadow-xs font-bold'
                                    : 'text-slate-600 hover:text-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Thread List */}
            <div className="space-y-4">
                {filteredThreads.length === 0 ? (
                    <Card className="border-slate-200/80 p-8 text-center space-y-2">
                        <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                        <h3 className="text-sm font-bold text-dark">Belum Ada Diskusi</h3>
                        <p className="text-xs text-muted">Jadilah yang pertama membuat topik pertanyaan di forum ini.</p>
                    </Card>
                ) : (
                    filteredThreads.map((thread) => (
                        <Card key={thread.id} className="border-slate-200/80 hover:border-slate-300 transition-colors">
                            <CardContent className="p-5 space-y-4">
                                {/* Author Info */}
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={thread.avatar}
                                            alt={thread.author}
                                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                        />
                                        <div>
                                            <h4 className="text-xs font-bold text-dark flex items-center gap-2">
                                                {thread.author}
                                                <span className="text-[10px] font-semibold text-muted bg-slate-100 px-2 py-0.5 rounded-full">
                                                    {thread.role}
                                                </span>
                                            </h4>
                                            <span className="text-[10px] text-muted flex items-center gap-1 pt-0.5">
                                                <Clock className="w-3 h-3" />
                                                {thread.createdAt}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge variant="primary" size="sm">{thread.category}</Badge>
                                </div>

                                {/* Content */}
                                <div className="space-y-1.5">
                                    <h3 className="text-sm font-bold text-dark leading-snug">{thread.title}</h3>
                                    <p className="text-xs text-slate-600 leading-relaxed">{thread.content}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleLike(thread.id)}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60"
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            <span>{thread.likes} Bermanfaat</span>
                                        </button>

                                        <button
                                            onClick={() =>
                                                setActiveThreadId(activeThreadId === thread.id ? null : thread.id)
                                            }
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-dark transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60"
                                        >
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span>{thread.replies.length} Balasan</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Replies Accordion Section */}
                                {activeThreadId === thread.id && (
                                    <div className="pt-4 border-t border-slate-100 space-y-4">
                                        <h5 className="text-xs font-bold text-dark">Tanggapan & Diskusi</h5>

                                        {/* Reply List */}
                                        <div className="space-y-3">
                                            {thread.replies.length === 0 ? (
                                                <p className="text-xs text-muted italic">Belum ada balasan pada topik ini.</p>
                                            ) : (
                                                thread.replies.map((reply) => (
                                                    <div
                                                        key={reply.id}
                                                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${reply.isTeacher
                                                                ? 'bg-amber-50/50 border-amber-200/80'
                                                                : 'bg-slate-50 border-slate-200/60'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-dark flex items-center gap-1.5">
                                                                {reply.author}
                                                                {reply.isTeacher && (
                                                                    <span className="text-[9px] bg-amber-500 text-white font-extrabold px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                                                                        <UserCheck className="w-2.5 h-2.5" /> Guru
                                                                    </span>
                                                                )}
                                                            </span>
                                                            <span className="text-[10px] text-muted">{reply.createdAt}</span>
                                                        </div>
                                                        <p className="text-slate-600 leading-relaxed">{reply.content}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {/* Input Reply */}
                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="text"
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Tulis tanggapan atau jawaban kamu..."
                                                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                            <Button size="sm" onClick={() => handleAddReply(thread.id)} className="gap-1">
                                                <Send className="w-3.5 h-3.5" />
                                                Kirim
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Modal New Thread */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-5"
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="text-base font-bold text-dark">Buat Topik Diskusi Baru</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-dark hover:bg-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateThread} className="space-y-4">
                                <Input
                                    label="Judul Pertanyaan / Pertanyaan Singkat"
                                    placeholder="Contoh: Mengapa useEffect dipanggil dua kali saat React StrictMode?"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    required
                                />

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-dark block">Kategori Topik</label>
                                    <select
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                                    >
                                        <option value="Kejuruan RPL">Kejuruan RPL</option>
                                        <option value="Umum">Umum</option>
                                        <option value="Diskusi Bebas">Diskusi Bebas</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-dark block">Rincian Pertanyaan / Penjelasan</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Jelaskan kendala, potongan kode, atau konteks pertanyaan secara mendetail..."
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button size="sm" type="submit" className="gap-1.5">
                                        <Send className="w-3.5 h-3.5" />
                                        Terbitkan Diskusi
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default ForumPage;
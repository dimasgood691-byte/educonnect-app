import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import {
    Search,
    Bell,
    Sparkles,
    ChevronDown,
    User,
    LogOut,
    Check,
    BookOpen,
    Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import announcementsData from '../../data/announcements.json';

const initialNotifications = [
    {
        id: 'notif-1',
        title: 'Tugas Baru Diunggah',
        message: 'Tugas Slicing UI React JS telah ditambahkan.',
        time: '10 menit yang lalu',
        unread: true,
        icon: BookOpen,
    },
    {
        id: 'notif-2',
        title: 'Sertifikat Diterbitkan',
        message: 'Sertifikat kelulusan modul SQL Lanjutan siap diunduh.',
        time: '2 jam yang lalu',
        unread: true,
        icon: Award,
    },
    ...announcementsData.slice(0, 2).map((announcement) => ({
        id: `announcement-${announcement.id}`,
        title: announcement.title,
        message: announcement.content,
        time: announcement.date,
        unread: true,
        icon: Bell,
    })),
];

export const DashboardLayout = ({ children, role: customRole }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Gunakan role dari AuthContext jika prop role tidak dikirimkan eksplisit
    const activeRole = customRole || user?.role || 'student';

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    const unreadCount = notifications.filter((n) => n.unread).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, unread: false })));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background font-sans antialiased flex">
            {/* Sidebar Navigasi dengan Role Otomatis */}
            <Sidebar
                role={activeRole}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
                    }`}
            >
                {/* Topbar Header */}
                <header className="h-16 bg-card border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between gap-4 glass-effect">
                    <div className="flex items-center gap-2 bg-slate-100/80 rounded-xl px-3 py-1.5 w-full max-w-md border border-slate-200/60 focus-within:border-primary focus-within:bg-white transition-all">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Cari materi, tugas, pengumuman, atau teman..."
                            className="bg-transparent border-none outline-none text-xs text-dark placeholder:text-slate-400 w-full"
                        />
                        <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded">
                            ⌘K
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accentSoft border border-amber-200/80">
                            <Sparkles className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-xs font-bold text-primary">Level 5</span>
                            <span className="text-[10px] text-muted border-l border-amber-200 pl-2">
                                1,450 XP
                            </span>
                        </div>  

                        {/* Notification Bell Dropdown */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => {
                                    setIsNotifOpen(!isNotifOpen);
                                    setIsProfileOpen(false);
                                }}
                                className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-dark transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
                                )}
                            </button>

                            <AnimatePresence>
                                {isNotifOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50"
                                    >
                                        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                            <h3 className="text-xs font-bold text-dark">Notifikasi</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={handleMarkAllAsRead}
                                                    className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                                                >
                                                    <Check className="w-3 h-3" /> Tandai Dibaca
                                                </button>
                                            )}
                                        </div>

                                        <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                                            {notifications.length === 0 ? (
                                                <p className="p-4 text-center text-xs text-muted">
                                                    Tidak ada notifikasi baru.
                                                </p>
                                            ) : (
                                                notifications.map((notif) => {
                                                    const Icon = notif.icon;
                                                    return (
                                                        <div
                                                            key={notif.id}
                                                            className={`p-3 flex items-start gap-3 transition-colors ${notif.unread ? 'bg-amber-50/30' : 'hover:bg-slate-50'
                                                                }`}
                                                        >
                                                            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                                                                <Icon className="w-4 h-4" />
                                                            </div>
                                                            <div className="flex-1 space-y-0.5">
                                                                <h4 className="text-xs font-bold text-dark leading-tight">
                                                                    {notif.title}
                                                                </h4>
                                                                <p className="text-[11px] text-slate-600 leading-snug">
                                                                    {notif.message}
                                                                </p>
                                                                <span className="text-[9px] text-slate-400 block pt-1">
                                                                    {notif.time}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <div
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    setIsNotifOpen(false);
                                }}
                                className="flex items-center gap-2 pl-2 border-l border-slate-200/80 cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <img
                                    src={
                                        user?.avatar ||
                                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                                    }
                                    alt={user?.name || 'Felix'}
                                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary/20"
                                />
                                <span className="hidden md:inline-block text-xs font-bold text-dark">
                                    {user?.name || 'Felix'}
                                </span>
                                <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
                            </div>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-1.5 z-50 space-y-0.5"
                                    >
                                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                            <p className="text-xs font-bold text-dark truncate">
                                                {user?.name || 'Felix'}
                                            </p>
                                            <p className="text-[10px] text-muted truncate">
                                                {user?.email || 'felix@educonnect.id'}
                                            </p>
                                        </div>

                                        <Link
                                            to="/profile/edit"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-dark hover:bg-slate-100 transition-colors"
                                        >
                                            <User className="w-3.5 h-3.5" />
                                            <span>Edit Profil & Keamanan</span>
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Keluar Akun</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
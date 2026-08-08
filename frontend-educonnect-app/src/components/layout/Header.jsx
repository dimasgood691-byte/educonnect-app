import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Sparkles,
    User,
    Settings,
    LogOut,
    ChevronDown,
    Check,
    BookOpen,
    Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
];

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(initialNotifications);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Hitung berapa notifikasi yang belum dibaca
    const unreadCount = notifications.filter((n) => n.unread).length;

    // Tutup dropdown jika klik di luar area
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
        <header className="w-full bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
            {/* Dynamic Title / Greeting */}
            <div>
                <h1 className="text-base font-extrabold text-dark tracking-tight">
                    Selamat Datang, {user?.name || 'Felix'} 👋
                </h1>
                <p className="text-[11px] text-muted">Mari lanjutkan aktivitas belajarmu hari ini.</p>
            </div>

            {/* Right Controls Area */}
            <div className="flex items-center gap-4">
                {/* 1. Level & XP Badge */}
                <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span className="font-extrabold text-amber-600">Level 5</span>
                    <span className="text-slate-300 font-light">|</span>
                    <span className="font-bold text-slate-600">1,450 XP</span>
                </div>

                {/* 2. Notification Dropdown Toggle */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => {
                            setIsNotifOpen(!isNotifOpen);
                            setIsProfileOpen(false);
                        }}
                        className="p-2 rounded-xl text-slate-500 hover:text-dark hover:bg-slate-100 relative transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                        )}
                    </button>

                    {/* Notification Popover Panel */}
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

                {/* Separator Divider */}
                <div className="h-6 w-px bg-slate-200" />

                {/* 3. User Profile Dropdown Toggle */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            setIsNotifOpen(false);
                        }}
                        className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-slate-100 transition-colors"
                    >
                        <img
                            src={
                                user?.avatar ||
                                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                            }
                            alt={user?.name || 'User'}
                            className="w-9 h-9 rounded-xl object-cover border-2 border-amber-200/80"
                        />
                        <span className="text-xs font-bold text-dark">{user?.name || 'Felix'}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Profile Dropdown Menu */}
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
                                    to="/analytics"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-dark hover:bg-slate-100 transition-colors"
                                >
                                    <User className="w-3.5 h-3.5" />
                                    <span>Profil & Statistik</span>
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
    );
};

export default Header;
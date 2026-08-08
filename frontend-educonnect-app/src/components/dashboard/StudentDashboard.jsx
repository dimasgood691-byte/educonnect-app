import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Clock,
    CheckCircle2,
    FileText,
    Sparkles,
    ArrowRight,
    TrendingUp,
    AlertCircle,
    Calendar as CalendarIcon,
} from 'lucide-react';
// Jika StudentDashboard berada di src/components/dashboard/StudentDashboard.jsx:
import DashboardLayout from "../layout/DashboardLayout";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import AnnouncementCard from '../announcements/AnnouncementCard';
import { useAuth } from "../../context/AuthContext";

import coursesData from "../../data/courses.json";
import assignmentsData from "../../data/assignments.json";
import announcementsData from "../../data/announcements.json";

export const StudentDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const pendingAssignments = assignmentsData.filter((a) => a.status === 'pending');
    const highlightedAssignments = pendingAssignments.slice(0, 2);
    const todaySchedule = [
        { time: '07.30 - 09.00', subject: 'Pemrograman Web & Perangkat Bergerak', room: 'Lab Komputer 2', teacher: 'Rian Kusuma, S.Pd.' },
        { time: '09.15 - 10.45', subject: 'Basiskom / Basis Data', room: 'Lab Komputer 1', teacher: 'Siti Rahmawati, M.T.' },
        { time: '11.00 - 12.30', subject: 'Pendidikan Pancasila', room: 'Kelas XII RPL 1', teacher: 'Budi Santoso, S.Pd.' },
    ];

    return (
        <DashboardLayout>
            {/* 1. Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-dark via-slate-900 to-slate-800 text-white shadow-xl overflow-hidden"
            >
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/10 blur-2xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
                        <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                        <span>Selamat Datang Kembali</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Semangat Belajar, {user?.name || 'Siswa'}! 🚀
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        Kamu memiliki <span className="text-primary font-bold">{pendingAssignments.length} tugas</span> yang harus diselesaikan minggu ini. Mari tingkatkan XP dan raih performa terbaikmu!
                    </p>
                </div>
            </motion.div>

            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted font-medium">Tugas Menggantung</span>
                            <p className="text-2xl font-bold text-dark">{pendingAssignments.length}</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-primary">
                            <Clock className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted font-medium">Rata-Rata Nilai</span>
                            <p className="text-2xl font-bold text-emerald-600">94.8</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted font-medium">Materi Terdaftar</span>
                            <p className="text-2xl font-bold text-dark">{coursesData.length}</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs text-muted font-medium">Perolehan Poin XP</span>
                            <p className="text-2xl font-bold text-primary">1,450 XP</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-accentSoft border border-amber-200 flex items-center justify-center text-primary">
                            <Sparkles className="w-5 h-5 fill-primary" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Main Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (Jadwal + Tugas) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Schedule Section */}
                    <Card className="border-slate-200/80">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-primary" />
                                Jadwal Pelajaran Hari Ini
                            </CardTitle>
                            <Badge variant="primary" size="sm">Jumat, 7 Agt 2026</Badge>
                        </CardHeader>
                        <CardContent className="p-4 divide-y divide-slate-100">
                            {todaySchedule.map((item, idx) => (
                                <div key={idx} className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold text-dark">{item.subject}</h4>
                                        <p className="text-[11px] text-muted">{item.teacher} • <span className="text-slate-700 font-medium">{item.room}</span></p>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-accentSoft px-3 py-1 rounded-lg self-start sm:self-auto">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Pending Assignments Section */}
                    <Card className="border-slate-200/80">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                Tugas Mendatang
                            </CardTitle>
                            <span className="text-xs text-primary font-bold cursor-pointer hover:underline">Lihat Semua →</span>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {pendingAssignments.map((task) => (
                                <div key={task.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="warning" size="sm">{task.courseTitle}</Badge>
                                            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                                Batas: {task.dueDate}
                                            </span>
                                        </div>
                                        <h4 className="text-xs font-bold text-dark truncate">{task.title}</h4>
                                    </div>
                                    <Button variant="outline" size="sm">Kumpulkan</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column (Assignment + Pengumuman) */}
                <div className="space-y-8">
                    <Card className="border-primary/20 bg-gradient-to-br from-amber-50 via-white to-primary/5 shadow-sm">
                        <CardHeader className="pb-2 border-b border-amber-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                                <FileText className="w-4 h-4" />
                                Tugas Prioritas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between rounded-xl bg-white/80 p-3 border border-amber-100">
                                <div>
                                    <p className="text-xs font-bold text-dark">{pendingAssignments.length} tugas belum selesai</p>
                                    <p className="text-[11px] text-muted">Jangan sampai ketinggalan deadline minggu ini.</p>
                                </div>
                                <Badge variant="warning" size="sm">Wajib diisi</Badge>
                            </div>

                            <div className="space-y-2">
                                {highlightedAssignments.map((task) => (
                                    <div key={task.id} className="rounded-xl border border-slate-200 bg-white p-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-bold text-dark truncate">{task.title}</p>
                                                <p className="text-[10px] text-muted">{task.courseTitle} • {task.dueDate}</p>
                                            </div>
                                            <Badge variant="primary" size="sm">Baru</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button variant="outline" size="sm" className="w-full justify-center" onClick={() => navigate('/assignments')}>
                                Lihat Semua Tugas
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* School Announcements */}
                    <Card className="border-slate-200/80">
                        <CardHeader className="pb-2 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-primary" />
                                Pengumuman Sekolah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            {announcementsData.slice(0, 2).map((ann) => (
                                <AnnouncementCard key={ann.id} announcement={ann} />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
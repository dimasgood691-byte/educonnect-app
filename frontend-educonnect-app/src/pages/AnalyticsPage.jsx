import React from 'react';
import { motion } from 'framer-motion';
import {
    Trophy,
    TrendingUp,
    Award,
    Zap,
    CheckCircle2,
    BarChart3,
    Star,
    ShieldCheck,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const leaderboardData = [
    { rank: 1, name: 'Budi Pratama', xp: 2450, badge: 'Suhu React', isCurrentUser: false },
    { rank: 2, name: 'Siti Nurhaliza', xp: 2310, badge: 'Master CSS', isCurrentUser: false },
    { rank: 3, name: 'Felix', xp: 1850, badge: 'Pro Developer', isCurrentUser: true },
    { rank: 4, name: 'Rian Kusuma', xp: 1720, badge: 'Code Ninja', isCurrentUser: false },
    { rank: 5, name: 'Aditya Perkasa', xp: 1600, badge: 'Learner', isCurrentUser: false },
];

export const AnalyticsPage = () => {
    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
                        Analitik & Peringkat Kelas 📊
                    </h1>
                    <p className="text-xs sm:text-sm text-muted">
                        Pantau statistik perkembangan belajar, perolehan XP, dan posisi papan peringkat kamu.
                    </p>
                </div>
                <Badge variant="warning" size="md" className="self-start sm:self-auto gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>1,850 Total XP</span>
                </Badge>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Rata-rata Nilai</p>
                            <h3 className="text-2xl font-black text-dark mt-1">92.5</h3>
                            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                                <TrendingUp className="w-3 h-3" /> +4.2% dari bulan lalu
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Tugas Selesai</p>
                            <h3 className="text-2xl font-black text-dark mt-1">12 / 14</h3>
                            <span className="text-[10px] text-primary font-bold block mt-1">85% Kelengkapan</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-primary">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Peringkat Kelas</p>
                            <h3 className="text-2xl font-black text-dark mt-1">#3</h3>
                            <span className="text-[10px] text-amber-600 font-bold block mt-1">Top 5% Teratas</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                            <Trophy className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200/80">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Sertifikat Diraih</p>
                            <h3 className="text-2xl font-black text-dark mt-1">2 Modul</h3>
                            <span className="text-[10px] text-purple-600 font-bold block mt-1">Siap Diunduh</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                            <Award className="w-6 h-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Grid: Grade Distribution & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grade Visual Bar */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-200/80">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-sm font-bold flex items-center justify-between">
                                <span>Ringkasan Nilai per Mata Pelajaran</span>
                                <span className="text-xs font-normal text-muted">Semester Ganjil 2026</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            {[
                                { subject: 'Pemrograman Web & Perangkat Bergerak', score: 95, color: 'bg-primary' },
                                { subject: 'Basis Data & Query SQL Lanjutan', score: 88, color: 'bg-emerald-500' },
                                { subject: 'Bahasa Inggris untuk Industri IT', score: 92, color: 'bg-indigo-500' },
                                { subject: 'Pendidikan Pancasila & Kewarganegaraan', score: 90, color: 'bg-amber-500' },
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-dark">
                                        <span>{item.subject}</span>
                                        <span className="text-slate-600">{item.score} / 100</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/50">
                                        <div
                                            className={`${item.color} h-full rounded-full transition-all duration-700`}
                                            style={{ width: `${item.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Leaderboard Sidebar */}
                <div className="space-y-4">
                    <Card className="border-slate-200/80">
                        <CardHeader className="border-b border-slate-100 pb-3">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-500" />
                                <span>Leaderboard Siswa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 divide-y divide-slate-100">
                            {leaderboardData.map((user) => (
                                <div
                                    key={user.rank}
                                    className={`p-3 rounded-xl flex items-center justify-between gap-3 transition-all ${user.isCurrentUser ? 'bg-amber-50/60 border border-amber-200/80' : 'hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${user.rank === 1
                                                    ? 'bg-amber-400 text-white'
                                                    : user.rank === 2
                                                        ? 'bg-slate-300 text-slate-700'
                                                        : user.rank === 3
                                                            ? 'bg-amber-700 text-white'
                                                            : 'text-slate-400'
                                                }`}
                                        >
                                            {user.rank}
                                        </span>
                                        <div>
                                            <h4 className="text-xs font-bold text-dark flex items-center gap-1.5">
                                                {user.name}
                                                {user.isCurrentUser && (
                                                    <span className="text-[9px] bg-primary text-white px-1.5 py-0.2 rounded-full font-semibold">
                                                        Kamu
                                                    </span>
                                                )}
                                            </h4>
                                            <span className="text-[10px] text-muted font-medium">{user.badge}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-primary">{user.xp} XP</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AnalyticsPage;
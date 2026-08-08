import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Sparkles,
    ArrowRight,
    BookOpen,
    FileCheck2,
    Users,
    Award,
    BarChart3,
    Bot,
    CheckCircle2,
    Star,
    GraduationCap,
    ShieldCheck,
    Zap,
} from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { scrollRevealVariants } from '../hooks/useScrollReveal';

export const LandingPage = () => {
    const features = [
        {
            icon: BookOpen,
            title: 'Materi Pembelajaran Interaktif',
            desc: 'Akses PDF, PPT, Video Youtube, dan dokumen pendukung dalam satu modul terstruktur rapi.',
            tag: 'Integrated',
        },
        {
            icon: FileCheck2,
            title: 'Tugas & Kuis Real-Time',
            desc: 'Pengumpulan tugas anti-terlambat dengan countdown timer dan penilaian otomatis instan.',
            tag: 'Auto-Grading',
        },
        {
            icon: Users,
            title: 'Forum Komunitas & Diskusi',
            desc: 'Ruang kolaborasi siswa dan guru per mata pelajaran dengan fitur reply bertingkat.',
            tag: 'Interactive',
        },
        {
            icon: BarChart3,
            title: 'Dashboard Analitik Presisi',
            desc: 'Pantau grafik perkembangan nilai, rata-rata kelas, dan grafik kehadiran secara detail.',
            tag: 'Analytics',
        },
        {
            icon: Award,
            title: 'Gamifikasi & Sertifikat Digital',
            desc: 'Sistem poin XP, badge pencapaian, level-up, dan klaim sertifikat berstandar resmi.',
            tag: 'Gamified',
        },
        {
            icon: Bot,
            title: 'AI Learning Assistant',
            desc: 'Asisten cerdas 24/7 yang siap menjawab pertanyaan seputar materi dan merangkum pelajaran.',
            tag: 'AI Powered',
        },
    ];

    const testimonials = [
        {
            name: 'Dr. Sarah Wijaya',
            role: 'Kepala Sekolah SMA Garuda',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
            comment: 'EduConnect memangkas keterceceran materi dan pengumuman sekolah. Semua kebutuhan akademik terkoordinasi sempurna dalam satu platform.',
            rating: 5,
        },
        {
            name: 'Rian Kusuma, S.Pd.',
            role: 'Guru Matematika & RPL',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
            comment: 'Fitur kuis otomatis dan koreksi tugasnya menghemat waktu saya hingga 60%. Siswa juga jauh lebih aktif berdiskusi.',
            rating: 5,
        },
        {
            name: 'Amanda Putri',
            role: 'Siswa Kelas XII RPL',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            comment: 'Tampilannya keren banget seperti Notion! Belajar jadi seru karena ada sistem Level XP dan Badge sertifikat.',
            rating: 5,
        },
    ];

    return (
        <div className="min-h-screen bg-background text-dark font-sans overflow-x-hidden">
            {/* 1. Header Navigasi */}
            <Navbar />

            {/* 2. Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                {/* Soft Radial Background Blur Oranye */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        {/* Tagline Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accentSoft border border-amber-200/80 shadow-xs"
                        >
                            <Sparkles className="w-4 h-4 text-primary fill-primary animate-pulse" />
                            <span className="text-xs font-extrabold text-primary tracking-wide uppercase">
                                Ekosistem Belajar Digital No.1 di Indonesia
                            </span>
                        </motion.div>

                        {/* Headline Utama */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.15]"
                        >
                            Satu Platform Terpadu Kelola{' '}
                            <span className="relative inline-block text-primary">
                                Materi, Tugas, & Nilai
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                                    viewBox="0 0 100 20"
                                    preserveAspectRatio="none"
                                >
                                    <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="6" fill="none" />
                                </svg>
                            </span>{' '}
                            Tanpa Tercecer.
                        </motion.h1>

                        {/* Sub-headline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
                        >
                            EduConnect mengintegrasikan ruang kelas virtual, kuis otomatis, forum interaktif, analitik perkembangan, dan sertifikat digital dalam satu dashboard SaaS modern.
                        </motion.p>

                        {/* CTA Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                        >
                            <Link to="/register" className="w-full sm:w-auto">
                                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
                                    Mulai Coba Gratis Now
                                </Button>
                            </Link>
                            <Link to="/dashboard" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" icon={Zap} className="w-full sm:w-auto">
                                    Lihat Live Demo Dashboard
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Micro Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="pt-6 flex items-center justify-center gap-6 text-xs text-muted"
                        >
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Tanpa Kartu Kredit</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Setup Kurang dari 2 Menit</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Dashboard Preview Card Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-14 relative max-w-5xl mx-auto rounded-2xl p-2 sm:p-4 bg-white/60 border border-slate-200/80 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="relative rounded-xl overflow-hidden border border-slate-200/60 bg-dark shadow-inner">
                            {/* Fake Window Bar */}
                            <div className="h-9 bg-slate-900/90 px-4 flex items-center gap-2 border-b border-slate-800">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                <span className="text-[11px] font-mono text-slate-400 mx-auto">educonnect.id/dashboard/student</span>
                            </div>

                            {/* Showcase Image Placeholder */}
                            <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-dark p-6 sm:p-10 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Selamat Datang Kembali</span>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white">Dashboard Belajar XI RPL</h3>
                                    </div>
                                    <Badge variant="primary">Aktif Semester Ganjil</Badge>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur">
                                        <span className="text-xs text-slate-400">Total Tugas Selesai</span>
                                        <p className="text-2xl font-bold text-white pt-1">24 / 26</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur">
                                        <span className="text-xs text-slate-400">Rata-Rata Nilai</span>
                                        <p className="text-2xl font-bold text-emerald-400 pt-1">94.8</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur">
                                        <span className="text-xs text-slate-400">Perolehan Poin XP</span>
                                        <p className="text-2xl font-bold text-amber-400 pt-1">1,450 XP</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                        <span className="text-xs text-slate-300">Live Syncing with Laravel Backend API</span>
                                    </div>
                                    <span className="text-xs text-primary font-semibold">Lihat Detail →</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Stats Counter Section */}
            <section className="py-12 bg-white border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <AnimatedCounter value={12500} suffix="+" className="text-3xl sm:text-4xl text-dark" />
                            <p className="text-xs font-semibold text-muted">Siswa Aktif</p>
                        </div>
                        <div className="space-y-1">
                            <AnimatedCounter value={450} suffix="+" className="text-3xl sm:text-4xl text-primary" />
                            <p className="text-xs font-semibold text-muted">Guru & Pengajar</p>
                        </div>
                        <div className="space-y-1">
                            <AnimatedCounter value={98} suffix="%" className="text-3xl sm:text-4xl text-dark" />
                            <p className="text-xs font-semibold text-muted">Kepuasan Pengguna</p>
                        </div>
                        <div className="space-y-1">
                            <AnimatedCounter value={35} suffix="+" className="text-3xl sm:text-4xl text-primary" />
                            <p className="text-xs font-semibold text-muted">Sekolah Mitra</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Feature Cards Section */}
            <section id="features" className="py-20 md:py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <Badge variant="primary">Fitur Unggulan</Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
                            Segala Kebutuhan Akademi dalam Satu Genggaman
                        </h2>
                        <p className="text-muted text-sm sm:text-base">
                            Dirancang khusus untuk menyederhanakan alur kerja pengajaran guru dan kenyamanan belajar siswa secara terpusat.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div
                                    key={feat.title}
                                    custom={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={scrollRevealVariants}
                                >
                                    <Card hoverable className="h-full border-slate-200/80">
                                        <CardContent className="p-8 space-y-4">
                                            <div className="w-12 h-12 rounded-2xl bg-accentSoft border border-amber-200/80 flex items-center justify-center text-primary shadow-xs">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-bold text-dark">{feat.title}</h3>
                                                </div>
                                                <p className="text-xs text-muted leading-relaxed">{feat.desc}</p>
                                            </div>
                                            <Badge variant="primary" size="sm">{feat.tag}</Badge>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. Testimonials Section */}
            <section className="py-20 bg-white border-t border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                        <Badge variant="primary">Testimoni Pengguna</Badge>
                        <h2 className="text-3xl font-extrabold text-dark tracking-tight">
                            Dipercaya oleh Ribuan Siswa & Tenaga Pendidik
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <Card key={i} className="bg-background border-slate-200/60">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(t.rating)].map((_, idx) => (
                                            <Star key={idx} className="w-4 h-4 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-dark italic leading-relaxed">"{t.comment}"</p>
                                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                                        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                                        <div>
                                            <h4 className="text-xs font-bold text-dark">{t.name}</h4>
                                            <p className="text-[10px] text-muted">{t.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Call to Action Banner */}
            <section className="py-16 md:py-20 bg-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Siap Mentransformasi Digitalisasi Sekolah Anda?
                    </h2>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
                        Bergabunglah bersama puluhan sekolah modern lainnya dan rasakan kemudahan pengelolaan akademik dalam satu sistem terintegrasi.
                    </p>
                    <div className="flex justify-center gap-4 pt-2">
                        <Link to="/register">
                            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                                Daftar Sekarang — Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 7. Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
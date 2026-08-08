import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle2, FileText, HelpCircle, Lock, Award } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import coursesData from '../data/courses.json';

export const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const course = coursesData.find((c) => c.id === id) || coursesData[0];

    const [activeModule, setActiveModule] = useState(0);

    const modules = [
        { id: 1, title: 'Pengenalan & Arsitektur ReactJS Modern', duration: '15 Menit', type: 'video', isCompleted: true },
        { id: 2, title: 'Komponen, Props & State Management', duration: '25 Menit', type: 'video', isCompleted: true },
        { id: 3, title: 'Styling dengan Tailwind CSS v4', duration: '20 Menit', type: 'reading', isCompleted: true },
        { id: 4, title: 'Kuis Evaluasi Bab 1: Dasar React & CSS', duration: '10 Soal', type: 'quiz', isCompleted: false },
        { id: 5, title: 'Menggunakan React Router DOM & Layout', duration: '30 Menit', type: 'video', isCompleted: false },
    ];

    return (
        <DashboardLayout>
            {/* Back Button */}
            <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Katalag Kursus
            </button>

            {/* Course Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col md:flex-row justify-between gap-6 shadow-xs">
                <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">{course.category}</Badge>
                        <span className="text-xs font-bold text-muted">{course.code}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark">{course.title}</h1>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{course.description}</p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-2">
                        <span>Pengajar: <strong className="text-dark">{course.teacher}</strong></span>
                        <span>•</span>
                        <span>Total: <strong className="text-dark">{course.totalModules} Modul</strong></span>
                    </div>
                </div>

                <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 border border-slate-200/60 flex flex-col justify-center space-y-2">
                    <span className="text-xs text-muted font-semibold">Progres Kelas</span>
                    <div className="text-2xl font-extrabold text-primary">{course.progress}%</div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                </div>
            </div>

            {/* Main Content: Player / Lesson + Module Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Lesson View */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-200/80 overflow-hidden">
                        <div className="aspect-video bg-slate-900 flex items-center justify-center text-white relative">
                            <div className="text-center space-y-3 p-6">
                                <PlayCircle className="w-16 h-16 text-primary mx-auto opacity-90 cursor-pointer hover:scale-110 transition-transform" />
                                <h3 className="text-sm sm:text-base font-bold">
                                    {modules[activeModule].title}
                                </h3>
                                <p className="text-xs text-slate-400">Klik play untuk memulai video materi</p>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <h2 className="text-base font-bold text-dark">
                                    Modul {modules[activeModule].id}: {modules[activeModule].title}
                                </h2>
                                <Button variant="outline" size="sm" className="gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Tandai Selesai
                                </Button>
                            </div>
                            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                                <p>
                                    Pada modul ini, kamu akan mempelajari konsep fundamental pembuatan komponen modular pada React JS, cara melewatkan data via props, serta mengelola status reaktif menggunakan `useState` hook.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Modules List Navigation */}
                <div className="space-y-4">
                    <Card className="border-slate-200/80">
                        <CardHeader className="pb-3 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold">Daftar Modul Pembelajaran</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 divide-y divide-slate-100">
                            {modules.map((mod, index) => {
                                const isActive = activeModule === index;
                                return (
                                    <button
                                        key={mod.id}
                                        onClick={() => setActiveModule(index)}
                                        className={`w-full p-3 text-left rounded-xl flex items-center justify-between gap-3 transition-all ${isActive
                                                ? 'bg-accentSoft border border-amber-200/80 text-primary font-bold'
                                                : 'hover:bg-slate-50 text-slate-700'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            {mod.isCompleted ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            ) : (
                                                <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                                            )}
                                            <div className="truncate">
                                                <p className="text-xs truncate font-semibold">{mod.id}. {mod.title}</p>
                                                <span className="text-[10px] text-muted font-normal">{mod.duration}</span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CourseDetailPage;
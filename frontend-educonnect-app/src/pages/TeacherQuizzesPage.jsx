import React from 'react';
import { HelpCircle, BarChart3, Sparkles, Plus } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const quizzes = [
    { id: 'quiz-1', title: 'Kuis React Dasar', className: 'XI RPL 1', questions: 15, avgScore: 82 },
    { id: 'quiz-2', title: 'Kuis SQL Lanjutan', className: 'XII RPL 1', questions: 12, avgScore: 88 },
    { id: 'quiz-3', title: 'Kuis Algoritma', className: 'XI RPL 2', questions: 10, avgScore: 75 },
];

export const TeacherQuizzesPage = () => {
    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark">Bank Soal & Kuis</h1>
                        <p className="text-xs text-muted">
                            Kelola kuis digital, bank soal, dan evaluasi otomatis untuk setiap kelas.
                        </p>
                    </div>
                    <Button variant="primary" size="sm" className="gap-2">
                        <Plus className="w-3.5 h-3.5" /> Buat Kuis Baru
                    </Button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {quizzes.map((quiz) => (
                        <Card key={quiz.id} className="border-slate-200/80">
                            <CardHeader className="p-5 pb-3">
                                <CardTitle className="text-sm font-bold text-dark">{quiz.title}</CardTitle>
                                <p className="text-[11px] text-slate-500">{quiz.className}</p>
                            </CardHeader>
                            <CardContent className="p-5 space-y-3">
                                <div className="text-[11px] text-slate-500 space-y-1">
                                    <p>{quiz.questions} soal</p>
                                    <p>Skor rata-rata: <span className="font-semibold text-dark">{quiz.avgScore}%</span></p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Badge variant="primary">Aktif</Badge>
                                    <Button variant="outline" size="sm" className="text-xs">Kelola Soal</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeacherQuizzesPage;

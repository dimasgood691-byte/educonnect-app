import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Shield } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const reportData = [
    { title: 'Rata-rata Nilai Kuis', value: '86.4%', detail: '+4.2% dari minggu lalu', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { title: 'Kepuasan Siswa', value: '91%', detail: 'Feedback positif pada materi online', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { title: 'Keterselesaian Tugas', value: '78%', detail: 'Perbaiki target penyelesaian kelas', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

export const TeacherReportsPage = () => {
    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark">Laporan Performance</h1>
                        <p className="text-xs text-muted">
                            Ringkasan data performa kelas dan hasil pembelajaran yang terbaru.
                        </p>
                    </div>
                    <Badge variant="primary" size="sm">Update Terbaru</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reportData.map((report, idx) => {
                        const Icon = report.icon;
                        return (
                            <Card key={idx} className="border-slate-200/80">
                                <CardContent className="p-5 space-y-4">
                                    <div className={`inline-flex items-center gap-2 p-3 rounded-2xl ${report.bg} ${report.border}`}>
                                        <Icon className={`w-5 h-5 ${report.color}`} />
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{report.title}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-3xl font-bold text-dark">{report.value}</p>
                                        <p className="text-[11px] text-slate-500">{report.detail}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card className="border-slate-200/80">
                    <CardHeader className="p-5 pb-3">
                        <CardTitle className="text-sm font-bold text-dark">Insight Rencana Tindak Lanjut</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 text-xs leading-relaxed text-slate-600 space-y-3">
                        <p>1. Fokuskan remedial untuk siswa dengan skor kuis di bawah 70% pada materi Basis Data.</p>
                        <p>2. Tambahkan kuis interaktif pada sesi akhir minggu untuk meningkatkan engagement.</p>
                        <p>3. Berikan sertifikat mini untuk siswa yang menyelesaikan tugas lebih awal.</p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default TeacherReportsPage;

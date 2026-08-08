import React from 'react';
import { FileText, CheckCircle2, Calendar, Tag } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const assignments = [
    { id: 'assign-1', title: 'Ulang Nilai Proyek Final', className: 'XI RPL 1', due: '20 Agt 2026', status: 'Perlu Dinilai' },
    { id: 'assign-2', title: 'Uji Kompetensi Function React', className: 'XII RPL 1', due: '22 Agt 2026', status: 'Terbuka' },
    { id: 'assign-3', title: 'Praktik Basis Data Normalisasi', className: 'XI RPL 2', due: '24 Agt 2026', status: 'Perlu Dinilai' },
];

export const TeacherAssignmentsPage = () => {
    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark">Penilaian Tugas</h1>
                        <p className="text-xs text-muted">
                            Pantau dan nilai tugas siswa dengan cepat dari satu tempat.
                        </p>
                    </div>
                    <Button variant="primary" size="sm" className="gap-2">
                        <FileText className="w-3.5 h-3.5" /> Buat Tugas Baru
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {assignments.map((item) => (
                        <Card key={item.id} className="border-slate-200/80">
                            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                                        <Tag className="w-4 h-4" /> {item.className}
                                    </div>
                                    <h2 className="text-sm font-bold text-dark">{item.title}</h2>
                                    <div className="text-[11px] text-slate-500 flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Batas: {item.due}</span>
                                        <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> {item.status}</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Buka Nilai</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeacherAssignmentsPage;

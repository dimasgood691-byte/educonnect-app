import React from 'react';
import { Users, Mail, Star } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const students = [
    { id: 'stu-1', name: 'Dinda Afriyani', grade: 'XI RPL 1', email: 'dinda@educonnect.id', status: 'Aktif' },
    { id: 'stu-2', name: 'Rizal Maulana', grade: 'XI RPL 2', email: 'rizal@educonnect.id', status: 'Aktif' },
    { id: 'stu-3', name: 'Nadia Putri', grade: 'XII RPL 1', email: 'nadia@educonnect.id', status: 'Sedang Cuti' },
];

export const TeacherStudentsPage = () => {
    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark">Daftar Siswa</h1>
                        <p className="text-xs text-muted">
                            Cari, pantau, dan lihat profil siswa berdasarkan kelas atau status aktif.
                        </p>
                    </div>
                    <Button variant="primary" size="sm" className="gap-2">
                        <Users className="w-3.5 h-3.5" /> Tambah Siswa
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {students.map((student) => (
                        <Card key={student.id} className="border-slate-200/80">
                            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-dark">{student.name}</span>
                                        <Badge variant="primary" size="sm">{student.grade}</Badge>
                                    </div>
                                    <div className="text-[11px] text-slate-500 space-y-1">
                                        <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {student.email}</p>
                                        <p className="flex items-center gap-2"><Star className="w-3.5 h-3.5" /> Status: {student.status}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Lihat Profil</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeacherStudentsPage;

import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  FileCheck2, 
  HelpCircle, 
  Plus, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ScheduleTable from '../schedule/ScheduleTable';
import assignmentsData from '../../data/assignments.json';
// Dummy Data Statistik Pengajar
const statsData = [
  {
    title: 'Total Siswa Aktif',
    value: '128',
    subtext: '+12 siswa bulan ini',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    title: 'Kelas & Kursus',
    value: '4',
    subtext: '2 Kejuruan, 2 Umum',
    icon: BookOpen,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
  },
  {
    title: 'Tugas Perlu Dinilai',
    value: '18',
    subtext: 'Dari 3 kelas berbeda',
    icon: FileCheck2,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    title: 'Rata-rata Skor Kuis',
    value: '84.5%',
    subtext: '+3.2% dari kuis lalu',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
];

// Dummy Data Tugas yang Harus Dinilai
const pendingSubmissions = [
  {
    id: 'sub-1',
    studentName: 'Ahmad Rizky',
    assignmentTitle: 'Tugas Sliced Layout Tailwind CSS',
    course: 'Kejuruan RPL - XI',
    submittedAt: '10 menit yang lalu',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
  },
  {
    id: 'sub-2',
    studentName: 'Siti Sarah',
    assignmentTitle: 'Tugas Build Dynamic Form React',
    course: 'Kejuruan RPL - XII',
    submittedAt: '45 menit yang lalu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
  },
  {
    id: 'sub-3',
    studentName: 'Budi Santoso',
    assignmentTitle: 'Tugas Sliced Layout Tailwind CSS',
    course: 'Kejuruan RPL - XI',
    submittedAt: '2 jam yang lalu',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100',
  },
];

// Dummy Data Aktivitas Kelas
const activeClasses = [
  {
    id: 'c1',
    name: 'Pemrograman Web Frontend (React)',
    classGroup: 'XI RPL 1',
    studentsCount: 36,
    progress: 75,
    nextSchedule: 'Besok, 08:00 WIB',
  },
  {
    id: 'c2',
    name: 'Desain UI/UX & Tailwind CSS',
    classGroup: 'XI RPL 2',
    studentsCount: 34,
    progress: 60,
    nextSchedule: 'Kamis, 10:00 WIB',
  },
  {
    id: 'c3',
    name: 'Backend API dengan Node.js',
    classGroup: 'XII RPL 1',
    studentsCount: 32,
    progress: 40,
    nextSchedule: 'Jumat, 13:00 WIB',
  },
];

export const TeacherDashboard = () => {
  const pendingReviewAssignments = assignmentsData.filter((item) => item.status === 'pending');

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header Dashboard & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-dark">Dashboard Guru</h1>
              <Badge variant="primary" size="sm">Mode Pengajar</Badge>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Kelola materi, nilai tugas siswa, dan pantau perkembangan kelas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Buat Tugas
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Materi Baru
            </Button>
          </div>
        </div>
          <ScheduleTable role="teacher" />

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="border-slate-200/80">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-muted">{stat.title}</span>
                    <div className="text-2xl font-black text-dark">{stat.value}</div>
                    <span className="text-[10px] text-slate-500 block font-medium">
                      {stat.subtext}
                    </span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${stat.bgColor} ${stat.borderColor} ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Daftar Kelas yang Diampu */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-slate-200/80">
              <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-dark">Kelas yang Diampu</CardTitle>
                  <p className="text-xs text-muted">Ringkasan kemajuan materi dan jadwal per kelas.</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                  Lihat Semua
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                {activeClasses.map((cls) => (
                  <div 
                    key={cls.id}
                    className="p-4 rounded-xl border border-slate-200/70 hover:border-slate-300 bg-white transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                          {cls.classGroup}
                        </span>
                        <h3 className="text-sm font-bold text-dark">{cls.name}</h3>
                      </div>
                      <Badge variant="neutral" size="sm" className="gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {cls.studentsCount} Siswa
                      </Badge>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className="text-slate-500">Progress Kurikulum</span>
                        <span className="text-dark">{cls.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${cls.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Jadwal: {cls.nextSchedule}
                      </span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-primary">
                        Kelola Kelas
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Antrean Penilaian Tugas */}
          <div className="space-y-4">
            <Card className="border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-sm">
              <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-dark">Tugas Aktif untuk Dinilai</CardTitle>
                  <p className="text-xs text-muted">Ringkasan tugas yang menunggu penilaian dari siswa.</p>
                </div>
                <Badge variant="warning" size="sm">{pendingReviewAssignments.length} tugas</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                {pendingReviewAssignments.slice(0, 3).map((task) => (
                  <div key={task.id} className="rounded-xl border border-amber-100 bg-white p-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-primary uppercase">{task.courseTitle}</span>
                      <Badge variant="primary" size="sm">{task.dueDate}</Badge>
                    </div>
                    <p className="text-xs font-semibold text-dark">{task.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-muted">
                      <span>Status: Menunggu</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">Lihat</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200/80">
              <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-dark">Perlu Dinilai</CardTitle>
                  <p className="text-xs text-muted">Pengumpulan tugas siswa terbaru.</p>
                </div>
                <Badge variant="rose" size="sm">{pendingSubmissions.length} Baru</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3">
                {pendingSubmissions.map((sub) => (
                  <div 
                    key={sub.id}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={sub.avatar} 
                        alt={sub.studentName} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-dark truncate">{sub.studentName}</h4>
                        <p className="text-[10px] text-slate-500 truncate">{sub.course}</p>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                      {sub.assignmentTitle}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] text-muted">
                      <span>{sub.submittedAt}</span>
                      <Button size="sm" className="h-6 px-2.5 text-[10px] font-bold">
                        Buka & Nilai
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
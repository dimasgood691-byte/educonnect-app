import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    HelpCircle,
    BarChart3,
    Award,
    MessageSquare,
    Users,
    CheckSquare,
    FolderKanban,
    GraduationCap,
    Bot,
    ChevronLeft,
    ChevronRight,
    Megaphone
} from 'lucide-react';

// Daftar menu khusus Siswa
const studentNavItems = [
    { label: 'Dashboard Siswa', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Pengumuman', icon: Megaphone, path: '/announcements' },
    { label: 'Kursus Saya', icon: BookOpen, path: '/courses' },
    { label: 'Tugas', icon: FileText, path: '/assignments' },
    { label: 'Kuis', icon: HelpCircle, path: '/quiz' },
    { label: 'Analitik', icon: BarChart3, path: '/analytics' },
    { label: 'Sertifikat', icon: Award, path: '/certificates' },
    { label: 'Forum', icon: MessageSquare, path: '/forum' },
    { label: 'AI Assistant', icon: Bot, path: '/ai-assistant', badge: 'New' },
];

// Daftar menu khusus Guru / Pengajar
const teacherNavItems = [
    { label: 'Dashboard Guru', icon: LayoutDashboard, path: '/teacher/dashboard' },
    { label: 'Pengumuman', icon: Megaphone, path: '/announcements' },
    { label: 'Kelola Kelas', icon: FolderKanban, path: '/teacher/classes' },
    { label: 'Penilaian Tugas', icon: CheckSquare, path: '/teacher/assignments' },
    { label: 'Bank Soal & Kuis', icon: HelpCircle, path: '/teacher/quizzes' },
    { label: 'Daftar Siswa', icon: Users, path: '/teacher/students' },
    { label: 'Laporan Performance', icon: BarChart3, path: '/teacher/reports' },
    { label: 'Forum Pengajar', icon: MessageSquare, path: '/forum' },
    { label: 'AI Assistant', icon: Bot, path: '/ai-assistant', badge: 'New' },
];

export const Sidebar = ({
    role = 'student',
    isCollapsed = false,
    setIsCollapsed
}) => {
    // Pilih menu berdasarkan role yang dikirimkan
    const navItems = role === 'teacher' ? teacherNavItems : studentNavItems;

    return (
        <aside
            className={`fixed top-0 left-0 z-30 h-screen bg-white border-r border-slate-200/80 transition-all duration-300 flex-col justify-between p-4 hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="space-y-6">
                {/* Brand / Logo Header */}
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                            E
                        </div>
                        {!isCollapsed && (
                            <div className="truncate">
                                <h2 className="font-bold text-dark text-sm leading-tight">EduConnect</h2>
                                <span className="text-[10px] text-muted font-semibold uppercase tracking-wider block">
                                    {role === 'teacher' ? 'Portal Pengajar' : 'Portal Siswa'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Toggle Collapse Button */}
                    {setIsCollapsed && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1 rounded-lg border border-slate-200 text-slate-400 hover:text-dark hover:bg-slate-100 transition-colors"
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-4 h-4" />
                            ) : (
                                <ChevronLeft className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>

                {/* Dynamic Navigation Links */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative group ${isActive
                                        ? 'bg-primary/10 text-primary font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-dark'
                                    }`
                                }
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {!isCollapsed && <span className="truncate">{item.label}</span>}

                                {/* Badge khusus seperti AI Assistant */}
                                {!isCollapsed && item.badge && (
                                    <span className="ml-auto px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-400 text-slate-900 rounded-md uppercase">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Role Badge Indicator Footer */}
            <div className={`p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                <div className={`p-2 rounded-lg shrink-0 ${role === 'teacher' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    <GraduationCap className="w-4 h-4" />
                </div>
                {!isCollapsed && (
                    <div className="text-[11px] min-w-0">
                        <p className="font-bold text-dark truncate">Dimas</p>
                        <p className="text-slate-500 capitalize">{role === 'teacher' ? 'Guru / Instruktur' : 'Siswa RPL'}</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
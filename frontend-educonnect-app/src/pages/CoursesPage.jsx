import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, CheckCircle2, PlayCircle, Filter } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import coursesData from '../data/courses.json';

export const CoursesPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const categories = ['Semua', 'Kejuruan RPL', 'Umum'];

    const filteredCourses = coursesData.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <DashboardLayout>
            {/* Header & Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
                        Materi Belajar & Kursus 📚
                    </h1>
                    <p className="text-xs sm:text-sm text-muted">
                        Akses seluruh modul pembelajaran, materi video, dan kuis interaktif kamu di sini.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start md:self-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat
                                    ? 'bg-white text-primary shadow-xs font-bold'
                                    : 'text-slate-600 hover:text-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari berdasarkan judul atau kode kelas..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-all shadow-xs"
                />
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, idx) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-all border-slate-200/80">
                            <div className="relative h-40 overflow-hidden bg-slate-100">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge variant="primary" size="sm">{course.category}</Badge>
                                </div>
                            </div>

                            <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        {course.code} • {course.teacher}
                                    </span>
                                    <h3 className="text-sm font-bold text-dark leading-snug line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                                        {course.description}
                                    </p>
                                </div>

                                {/* Progress Indicator */}
                                <div className="space-y-3 pt-2 border-t border-slate-100">
                                    <div>
                                        <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1">
                                            <span>Progres Belajar</span>
                                            <span className="text-primary font-bold">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                                            <div
                                                className="bg-primary h-full rounded-full transition-all duration-500"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[11px] text-muted font-medium flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {course.completedModules}/{course.totalModules} Modul
                                        </span>
                                        <Button
                                            size="sm"
                                            onClick={() => navigate(`/courses/${course.id}`)}
                                            className="gap-1.5"
                                        >
                                            <PlayCircle className="w-3.5 h-3.5" />
                                            Lanjut Belajar
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default CoursesPage;
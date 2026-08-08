import React, { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AssignmentCard from '../components/assignments/AssignmentCard';
import AssignmentSubmitForm from '../components/assignments/AssignmentSubmitForm';
import assignmentsData from '../data/assignments.json';

export const AssignmentsPage = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [selectedTask, setSelectedTask] = useState(null);

    const filteredTasks = assignmentsData.filter((task) =>
        activeTab === 'pending' ? task.status === 'pending' : task.status === 'completed'
    );

    const handleSubmitSuccess = () => {
        setSelectedTask(null);
    };

    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
                        Tugas & Kuis 📝
                    </h1>
                    <p className="text-xs sm:text-sm text-muted">
                        Pantau tenggat waktu tugas sekolah dan kumpulkan repositori/berkas kamu tepat waktu.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'pending'
                                ? 'bg-white text-primary shadow-xs font-bold'
                                : 'text-slate-600 hover:text-dark'
                            }`}
                    >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Perlu Dikerjakan</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${activeTab === 'completed'
                                ? 'bg-white text-emerald-600 shadow-xs font-bold'
                                : 'text-slate-600 hover:text-dark'
                            }`}
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesai & Dinilai</span>
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTasks.length === 0 ? (
                    <div className="md:col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                        <h3 className="text-sm font-bold text-dark">Tidak Ada Tugas di Tab Ini</h3>
                        <p className="text-xs text-muted">Semua tugas kamu pada kategori ini sudah dikerjakan atau belum tersedia.</p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <AssignmentCard key={task.id} task={task} onSubmit={setSelectedTask} />
                    ))
                )}
            </div>

            {selectedTask && (
                <AssignmentSubmitForm
                    task={selectedTask}
                    onCancel={() => setSelectedTask(null)}
                    onSuccess={handleSubmitSuccess}
                />
            )}
        </DashboardLayout>
    );
};

export default AssignmentsPage;
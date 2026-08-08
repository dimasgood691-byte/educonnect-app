import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

import DashboardLayout from "../components/layout/DashboardLayout";
import ScheduleTable from "../components/schedule/ScheduleTable";
import scheduleData from "../data/schedule.json";

export const SchedulePage = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Akademik</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-dark tracking-tight">
                            Jadwal Pelajaran
                        </h1>
                        <p className="text-xs sm:text-sm text-muted">
                            Lihat dan kelola jadwal mata pelajaran harianmu di sini.
                        </p>
                    </div>
                </motion.div>

                <div className="w-full">
                    <ScheduleTable role="student" schedule={scheduleData} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SchedulePage;
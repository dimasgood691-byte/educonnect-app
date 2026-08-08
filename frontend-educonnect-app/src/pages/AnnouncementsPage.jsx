import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone } from 'lucide-react';

import DashboardLayout from '../components/layout/DashboardLayout';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import announcements from '../data/announcements.json';

const AnnouncementsPage = () => {
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
                            <Megaphone className="w-4 h-4" />
                            <span>Informasi</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-dark tracking-tight">
                            Pengumuman
                        </h1>
                        <p className="text-xs sm:text-sm text-muted">
                            Pantau pengumuman terbaru dan penting dari sekolah.
                        </p>
                    </div>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {announcements.map((announcement) => (
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AnnouncementsPage;

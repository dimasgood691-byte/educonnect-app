import React, { useEffect, useMemo, useState } from 'react';
import { Clock, MapPin, User, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import scheduleData from '../../data/schedule.json';

const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const ScheduleTable = ({ schedule = scheduleData, role = 'student' }) => {
    const normalizedSchedule = Array.isArray(schedule) ? schedule : [];
    const [selectedDay, setSelectedDay] = useState('Senin');

    const daysList = useMemo(() => {
        const availableDays = normalizedSchedule.reduce((days, item) => {
            if (item.day && !days.includes(item.day)) {
                days.push(item.day);
            }
            return days;
        }, []);

        return availableDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    }, [normalizedSchedule]);

    useEffect(() => {
        if (daysList.length > 0 && !daysList.includes(selectedDay)) {
            setSelectedDay(daysList[0]);
        }
    }, [daysList, selectedDay]);

    const filteredSchedule = normalizedSchedule.filter((item) => item.day === selectedDay);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <Badge variant="neutral" size="sm">Selesai</Badge>;
            case 'ongoing':
                return <Badge variant="warning" size="sm" className="animate-pulse">Sedang Berlangsung</Badge>;
            case 'upcoming':
                return <Badge variant="primary" size="sm">Akan Datang</Badge>;
            default:
                return null;
        }
    };

    return (
        <Card className="border-slate-200/80">
            <CardHeader className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <CardTitle className="text-base font-bold text-dark flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        Jadwal {role === 'teacher' ? 'Mengajar' : 'Pelajaran'}
                    </CardTitle>
                    <p className="text-xs text-muted mt-0.5">
                        {role === 'teacher' ? 'Daftar kelas dan sesi mengajar mingguan.' : 'Daftar mata pelajaran harian kamu.'}
                    </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
                    {daysList.length > 0 ? (
                        daysList.map((day) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${selectedDay === day
                                        ? 'bg-white text-slate-800 shadow-xs font-bold'
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {day}
                            </button>
                        ))
                    ) : (
                        <span className="px-3 py-1.5 text-xs text-slate-500">Belum ada jadwal</span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-5 pt-2">
                {filteredSchedule.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {filteredSchedule.map((item) => (
                            <div
                                key={item.id}
                                className="py-3.5 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 p-3 rounded-xl transition-colors"
                            >
                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex flex-col items-center justify-center min-w-[70px]">
                                        <Clock className="w-4 h-4 mb-0.5" />
                                        <span className="text-[11px] font-bold">{item.timeStart}</span>
                                        <span className="text-[9px] text-slate-500 font-medium">{item.timeEnd}</span>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                                                {item.code}
                                            </span>
                                            {getStatusBadge(item.status)}
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                                            {item.subject}
                                        </h4>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-4 text-xs text-slate-600 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                                    <div className="flex items-center gap-3 text-[11px]">
                                        <span className="flex items-center gap-1 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                            {item.room}
                                        </span>
                                        <span className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                            {item.classGroup}
                                        </span>
                                    </div>

                                    {role === 'student' && (
                                        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 border-l border-slate-200 pl-3">
                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="truncate max-w-[140px]">{item.teacher}</span>
                                        </div>
                                    )}

                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center space-y-2">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-slate-700">Tidak ada jadwal pelajaran hari {selectedDay}</p>
                        <p className="text-[11px] text-slate-400">Nikmati waktu luang atau gunakan untuk mengulang materi.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ScheduleTable;
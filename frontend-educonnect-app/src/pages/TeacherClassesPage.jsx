import React, { useState } from 'react';
import { Plus, FolderKanban, Clock, Users } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const initialClassData = [
    { id: 'class-1', name: 'Pemrograman Web Frontend', group: 'XI RPL 1', students: 32, next: 'Senin, 08:00 WIB' },
    { id: 'class-2', name: 'Desain UI/UX & Figma', group: 'XI RPL 2', students: 28, next: 'Selasa, 09:30 WIB' },
    { id: 'class-3', name: 'Basis Data & SQL', group: 'XII RPL 1', students: 34, next: 'Kamis, 10:00 WIB' },
];

export const TeacherClassesPage = () => {
    const [classes, setClasses] = useState(initialClassData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        group: '',
        students: '0',
        next: '',
    });

    const openNewClassModal = () => {
        setEditingClass(null);
        setFormValues({ name: '', group: '', students: '0', next: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingClass(item);
        setFormValues({
            name: item.name,
            group: item.group,
            students: String(item.students),
            next: item.next,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingClass(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formValues.name.trim() || !formValues.group.trim()) {
            return;
        }

        const nextClass = {
            id: editingClass ? editingClass.id : `class-${Date.now()}`,
            name: formValues.name,
            group: formValues.group,
            students: Number(formValues.students) || 0,
            next: formValues.next || 'Belum dijadwalkan',
        };

        setClasses((prev) => {
            if (editingClass) {
                return prev.map((item) => (item.id === editingClass.id ? nextClass : item));
            }
            return [nextClass, ...prev];
        });

        closeModal();
    };

    const handleDelete = (id) => {
        setClasses((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark">Kelola Kelas</h1>
                        <p className="text-xs text-muted">
                            Atur daftar kelas, sesi pembelajaran, dan daftar siswa yang terdaftar.
                        </p>
                    </div>
                    <Button variant="primary" size="sm" className="gap-2" onClick={openNewClassModal}>
                        <Plus className="w-3.5 h-3.5" /> Tambah Kelas Baru
                    </Button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {classes.map((item) => (
                        <Card key={item.id} className="border-slate-200/80">
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-sm font-bold text-dark">{item.name}</h2>
                                        <p className="text-[11px] text-muted">{item.group}</p>
                                    </div>
                                    <Badge variant="primary" size="sm">{item.students} siswa</Badge>
                                </div>
                                <div className="text-[11px] text-slate-500 space-y-2">
                                    <p className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-primary" /> Sesi berikutnya: {item.next}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Users className="w-3.5 h-3.5 text-primary" /> Grade & penjadwalan penuh.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm" onClick={() => openEditModal(item)}>
                                        Kelola Kelas
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                        Hapus
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={editingClass ? 'Edit Kelas' : 'Tambah Kelas Baru'}
                    maxWidth="max-w-2xl"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-dark">Nama Kelas</label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white"
                                placeholder="Contoh: Pemrograman Web Frontend"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-dark">Kelompok / Kelas</label>
                            <input
                                type="text"
                                name="group"
                                value={formValues.group}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white"
                                placeholder="Contoh: XI RPL 1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-dark">Jumlah Siswa</label>
                                <input
                                    type="number"
                                    name="students"
                                    value={formValues.students}
                                    onChange={handleChange}
                                    min="0"
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-dark">Jadwal Berikutnya</label>
                                <input
                                    type="text"
                                    name="next"
                                    value={formValues.next}
                                    onChange={handleChange}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white"
                                    placeholder="Contoh: Senin, 08:00 WIB"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-slate-200">
                            <Button variant="ghost" size="md" onClick={closeModal}>
                                Batal
                            </Button>
                            <Button variant="primary" size="md" onClick={handleSave}>
                                {editingClass ? 'Simpan Perubahan' : 'Tambah Kelas'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default TeacherClassesPage;

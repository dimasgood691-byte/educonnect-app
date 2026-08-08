import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Camera,
    Lock,
    Save,
    ArrowLeft,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export const EditProfilePage = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    // Profile Form States
    const [name, setName] = useState(user?.name || 'Felix');
    const [email] = useState(user?.email || 'felix@educonnect.id');
    const [bio, setBio] = useState(
        'Siswa Software Engineering yang tertarik pada Web Development, React JS, dan UI/UX Design.'
    );
    const [avatar, setAvatar] = useState(
        user?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    );

    // Security Form States
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Status Notifikasi
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Preset Avatar Pilihan
    const presetAvatars = [
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    ];

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Validasi Sederhana Password Baru jika Diisi
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setErrorMessage('Konfirmasi kata sandi baru tidak cocok!');
                return;
            }
            if (newPassword.length < 6) {
                setErrorMessage('Kata sandi minimal terdiri dari 6 karakter.');
                return;
            }
        }

        // Perbarui Auth Context jika fungsi login/update tersedia
        if (login) {
            login({ ...user, name, avatar });
        }

        setSuccessMessage('Profil berhasil diperbarui!');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-dark hover:bg-slate-50 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
                                Pengaturan Profil ⚙️
                            </h1>
                            <p className="text-xs sm:text-sm text-muted">
                                Perbarui data diri, foto avatar, dan keamanan akun kamu.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notifikasi Pesan */}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{successMessage}</span>
                    </motion.div>
                )}

                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold"
                    >
                        {errorMessage}
                    </motion.div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Card 1: Avatar & Biografi */}
                    <Card className="border-slate-200/80">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-sm font-bold text-dark flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Foto Profil & Identitas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Selector Avatar */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                <div className="relative self-start sm:self-auto">
                                    <img
                                        src={avatar}
                                        alt={name}
                                        className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/20 border-2 border-white shadow-md"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-xl shadow-xs">
                                        <Camera className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-dark block">
                                        Pilih Avatar Karakter:
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        {presetAvatars.map((url, idx) => (
                                            <button
                                                type="button"
                                                key={idx}
                                                onClick={() => setAvatar(url)}
                                                className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${avatar === url
                                                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                                                        : 'border-slate-200 opacity-70 hover:opacity-100'
                                                    }`}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Avatar ${idx}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Form Input Data Utama */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Nama Lengkap"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Alamat Email (Read-Only)"
                                    value={email}
                                    disabled
                                    className="bg-slate-100 text-slate-500 cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-dark block">
                                    Bio Singkat
                                </label>
                                <textarea
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tulis minat, fokus belajar, atau kata motivasimu..."
                                    className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary shadow-xs transition-all"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Ubah Kata Sandi */}
                    <Card className="border-slate-200/80">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-sm font-bold text-dark flex items-center gap-2">
                                <Lock className="w-4 h-4 text-primary" />
                                Ubah Kata Sandi (Keamanan)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <Input
                                label="Kata Sandi Saat Ini"
                                type="password"
                                placeholder="Masukkan kata sandi lama..."
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Kata Sandi Baru"
                                    type="password"
                                    placeholder="Minimal 6 karakter"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Input
                                    label="Konfirmasi Kata Sandi Baru"
                                    type="password"
                                    placeholder="Ulangi kata sandi baru"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Action Submit Button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                        >
                            Batal
                        </Button>
                        <Button type="submit" className="gap-2">
                            <Save className="w-4 h-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default EditProfilePage;
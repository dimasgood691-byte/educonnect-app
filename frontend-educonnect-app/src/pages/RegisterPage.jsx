import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Lock, Mail, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-6 relative z-10"
            >
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2.5 group">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25">
                            <GraduationCap className="w-7 h-7" />
                        </div>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                        Buat Akun <span className="text-primary">EduConnect</span>
                    </h1>
                    <p className="text-xs text-muted">Bergabunglah dalam ekosistem belajar digital terintegrasi</p>
                </div>

                <Card className="border-slate-200/80 shadow-xl">
                    <CardContent className="p-6 sm:p-8 space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-dark">Nama Lengkap</label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Masukkan nama lengkap"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-dark">Email Sekolah</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="nama@sekolah.id"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-dark">Kata Sandi</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Minimal 8 karakter"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white"
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full pt-3">
                                Daftar Akun Baru
                            </Button>
                        </form>

                        <div className="pt-2 text-center text-xs text-muted">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Masuk di sini
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
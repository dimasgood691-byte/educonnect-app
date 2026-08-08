import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Lock, Mail, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('felix@student.educonnect.id');
    const [password, setPassword] = useState('password123');
    const [role, setRole] = useState('student');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login({
                name: email.split('@')[0] || 'Felix',
                email,
                role,
            });
            setIsLoading(false);
            navigate('/dashboard');
        }, 600);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background Oranye Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-6 relative z-10"
            >
                {/* Header Brand */}
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2.5 group">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-7 h-7" />
                        </div>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                        Masuk ke <span className="text-primary">EduConnect</span>
                    </h1>
                    <p className="text-xs text-muted">Masukkan kredensial akun Anda untuk mengakses dashboard</p>
                </div>

                {/* Form Card */}
                <Card className="border-slate-200/80 shadow-xl">
                    <CardContent className="p-6 sm:p-8 space-y-5">
                        {/* Role Selector Tabs */}
                        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                            {[
                                { id: 'student', label: 'Siswa' },
                                { id: 'teacher', label: 'Guru' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setRole(item.id)}
                                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${role === item.id
                                            ? 'bg-white text-primary shadow-xs'
                                            : 'text-slate-500 hover:text-dark'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Field Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-dark">Email Sekolah / Pengguna</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nama@sekolah.id"
                                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Field Password */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-dark">Kata Sandi</label>
                                    <a href="#" className="text-[11px] text-primary font-semibold hover:underline">
                                        Lupa sandi?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isLoading}
                                icon={ArrowRight}
                                iconPosition="right"
                                className="w-full mt-2"
                            >
                                Masuk Sekarang
                            </Button>
                        </form>

                        <div className="pt-2 text-center text-xs text-muted">
                            Belum memiliki akun?{' '}
                            <Link to="/register" className="text-primary font-bold hover:underline">
                                Daftar Akun Baru
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-[11px] text-slate-400">
                    © 2026 EduConnect Platform. Hak Cipta Dilindungi.
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
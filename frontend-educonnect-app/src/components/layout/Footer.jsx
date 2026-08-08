import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-dark text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-extrabold text-white tracking-tight">
                                Edu<span className="text-primary">Connect</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Platform ekosistem pembelajaran digital terintegrasi yang menghubungkan siswa, guru, orang tua, dan sekolah dalam satu dashboard modern & interaktif.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Jakarta, Indonesia</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigasi Utama */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigasi</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/" className="hover:text-primary transition-colors">Beranda</Link></li>
                            <li><Link to="/#features" className="hover:text-primary transition-colors">Fitur Unggulan</Link></li>
                            <li><Link to="/schedule" className="hover:text-primary transition-colors">Jadwal Pelajaran</Link></li>
                            <li><Link to="/announcements" className="hover:text-primary transition-colors">Pengumuman</Link></li>
                            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portofolio Siswa</Link></li>
                        </ul>
                    </div>

                    {/* Fitur Utama */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ekosistem</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/materials" className="hover:text-primary transition-colors">Materi Interactive</Link></li>
                            <li><Link to="/assignments" className="hover:text-primary transition-colors">Tugas & Kuis</Link></li>
                            <li><Link to="/forum" className="hover:text-primary transition-colors">Forum Diskusi</Link></li>
                            <li><Link to="/ai-assistant" className="hover:text-primary transition-colors">AI Learning Buddy</Link></li>
                            <li><Link to="/certificates" className="hover:text-primary transition-colors">Sertifikat Digital</Link></li>
                        </ul>
                    </div>

                    {/* Kontak & Dukungan */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Dukungan</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>support@educonnect.id</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+62 (21) 8062-2026</span>
                            </li>
                            <li className="pt-2">
                                <span className="inline-block px-3 py-1 bg-amber-500/10 text-primary border border-amber-500/20 rounded-full text-xs font-semibold">
                                    SLA Response &lt; 2 Jam
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© 2026 EduConnect Platform. Seluruh Hak Cipta Dilindungi.</p>
                    <p className="flex items-center gap-1">
                        Dirancang dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk Pendidikan Indonesia.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
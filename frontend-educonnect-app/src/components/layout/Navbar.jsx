import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', path: '/' },
        { name: 'Fitur', path: '/#features' },
        { name: 'Jadwal', path: '/schedule' },
        { name: 'Pengumuman', path: '/announcements' },
        { name: 'Portofolio', path: '/portfolio' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'glass-effect shadow-soft py-3 border-b border-slate-200/60'
                    : 'bg-transparent py-5 border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Brand */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-extrabold tracking-tight text-dark flex items-center gap-1">
                                Edu<span className="text-primary">Connect</span>
                            </span>
                            <span className="text-[10px] font-semibold text-muted tracking-wider uppercase -mt-1">
                                Ecosystem
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${isActive
                                            ? 'text-primary bg-accentSoft'
                                            : 'text-slate-600 hover:text-dark hover:bg-slate-100/60'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost" size="md">
                                Masuk
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                                Daftar Gratis
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2.5 rounded-xl text-dark hover:bg-slate-100 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-effect border-b border-slate-200/80 overflow-hidden"
                    >
                        <div className="px-4 pt-3 pb-6 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-2.5 text-base font-semibold text-dark hover:bg-accentSoft hover:text-primary rounded-xl transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-2">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" size="md" className="w-full">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" size="md" className="w-full">
                                        Daftar Sekarang
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
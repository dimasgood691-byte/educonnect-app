import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, ExternalLink, ShieldCheck, X, Sparkles, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const certificates = [
    {
        id: 'cert-1',
        title: 'Pemrograman Web ReactJS & Tailwind CSS Modern', 
        issueDate: '01 Agustus 2026',
        credentialId: 'EDU-2026-RPL-089',
        instructor: 'Rian Kusuma, S.Pd.',
        category: 'Kejuruan RPL',
    },
    {
        id: 'cert-2',
        title: 'Dasar Perancangan Basis Data Relasional & SQL',
        issueDate: '25 Juli 2026',
        credentialId: 'EDU-2026-RPL-042',
        instructor: 'Siti Rahmawati, M.T.',
        category: 'Kejuruan RPL',
    },
];

export const CertificatesPage = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    const previewRef = useRef(null);

    const handleDownloadPdf = async () => {
        if (!previewRef.current || !selectedCert) return;

        const canvas = await html2canvas(previewRef.current, {
            scale: 2,
            backgroundColor: '#f8fafc',
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
        const imgWidth = imgProps.width * ratio;
        const imgHeight = imgProps.height * ratio;
        const marginX = (pdfWidth - imgWidth) / 2;
        const marginY = (pdfHeight - imgHeight) / 2;

        pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
        pdf.save(`${selectedCert.credentialId}-sertifikat.pdf`);
    };

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight">
                        Sertifikat Kelulusan 📜
                    </h1>
                    <p className="text-xs sm:text-sm text-muted">
                        Kumpulan sertifikat resmi kompetensi modul yang telah kamu selesaikan.
                    </p>
                </div>
            </div>

            {/* Certificate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                    <Card key={cert.id} className="border-slate-200/80 overflow-hidden hover:border-slate-300 transition-all">
                        <CardContent className="p-6 space-y-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                                    <Award className="w-6 h-6" />
                                </div>
                                <Badge variant="primary" size="sm">{cert.category}</Badge>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-dark leading-snug">{cert.title}</h3>
                                <p className="text-xs text-muted">Diterbitkan pada {cert.issueDate}</p>
                                <p className="text-[10px] text-slate-400 font-mono">ID: {cert.credentialId}</p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <span className="text-xs text-slate-600 font-medium">
                                    Pengajar: <strong className="text-dark">{cert.instructor}</strong>
                                </span>
                                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setSelectedCert(cert)}>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Lihat Sertifikat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Certificate Preview Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-dark hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Printable Certificate Frame */}
                            <div ref={previewRef} className="relative border-4 border-double border-slate-300 p-6 sm:p-8 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_35%),_linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_45%,_#ffffff_100%)] shadow-[0_20px_80px_rgba(15,23,42,0.12)] overflow-hidden text-center space-y-4">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_20%),_radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),_transparent_25%)]" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center gap-2 text-primary font-black text-[11px] tracking-[0.5em] uppercase">
                                        <ShieldCheck className="w-5 h-5 text-slate-700" />
                                        <span>EduConnect Certified</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">Sertifikat Kelulusan</h2>
                                    <p className="text-xs sm:text-sm text-slate-500">Sertifikat ini secara resmi diberikan kepada:</p>

                                    <h3 className="text-2xl sm:text-[2.4rem] font-extrabold text-slate-900 tracking-tight">
                                        Felix
                                    </h3>

                                    <p className="text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                                        Atas kelulusan dan penguasaan kompetensi pada modul <br />
                                        <strong className="text-slate-900">{selectedCert.title}</strong>
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200/80 text-left text-[12px] sm:text-sm">
                                        <div className="rounded-3xl bg-white/90 border border-slate-200 p-4 shadow-sm">
                                            <span className="text-muted block text-[10px] uppercase tracking-[0.18em]">Tanggal Terbit</span>
                                            <strong className="text-slate-900 block mt-2">{selectedCert.issueDate}</strong>
                                            <p className="text-[10px] text-slate-500 mt-1">ID {selectedCert.credentialId}</p>
                                        </div>
                                        <div className="rounded-3xl bg-white/90 border border-slate-200 p-4 shadow-sm">
                                            <span className="text-muted block text-[10px] uppercase tracking-[0.18em]">Pengajar Utama</span>
                                            <strong className="text-slate-900 block mt-2">{selectedCert.instructor}</strong>
                                            <p className="text-[10px] text-slate-500 mt-1">Kejuruan RPL</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <span>Keunggulan RPL: Cepat, Tepat, Profesional</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                                <Button variant="outline" size="sm" onClick={() => setSelectedCert(null)}>
                                    Tutup
                                </Button>
                                <Button size="sm" className="gap-1.5" onClick={handleDownloadPdf}>
                                    <Download className="w-3.5 h-3.5" />
                                    Unduh Sertifikat PDF
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default CertificatesPage;
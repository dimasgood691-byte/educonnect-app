import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Send, CheckCircle2, X } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/input';

const AssignmentSubmitForm = ({ task, onCancel, onSuccess }) => {
    const [submissionType, setSubmissionType] = useState('link');
    const [githubUrl, setGithubUrl] = useState('');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            onSuccess?.();
        }, 1500);
    };

    if (!task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                        <h3 className="text-base font-bold text-dark">Kumpulkan Tugas</h3>
                        <p className="text-xs text-muted truncate">{task.title}</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-1 rounded-lg text-slate-400 hover:text-dark hover:bg-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {isSubmitted ? (
                    <div className="text-center py-8 space-y-2">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                        <h4 className="text-sm font-bold text-dark">Tugas Berhasil Dikumpulkan!</h4>
                        <p className="text-xs text-muted">Guru pengampu akan segera memeriksa hasil kerjaanmu.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
                            <button
                                type="button"
                                onClick={() => setSubmissionType('link')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${submissionType === 'link' ? 'bg-white text-primary shadow-xs' : 'text-slate-600'}`}
                            >
                                <LinkIcon className="w-3.5 h-3.5" />
                                Link Repository GitHub
                            </button>
                            <button
                                type="button"
                                onClick={() => setSubmissionType('file')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${submissionType === 'file' ? 'bg-white text-primary shadow-xs' : 'text-slate-600'}`}
                            >
                                <Upload className="w-3.5 h-3.5" />
                                Upload File (.zip / .pdf)
                            </button>
                        </div>

                        {submissionType === 'link' ? (
                            <Input
                                label="URL Repository GitHub / Vercel"
                                placeholder="https://github.com/username/project-repo"
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                required
                            />
                        ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center space-y-2 hover:border-primary cursor-pointer transition-colors">
                                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                                <p className="text-xs font-semibold text-dark">Klik atau tarik file ke sini</p>
                                <p className="text-[10px] text-muted">Maksimal ukuran file 10MB (ZIP, PDF, RAR)</p>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-dark block">Catatan untuk Guru (Opsional)</label>
                            <textarea
                                rows={3}
                                placeholder="Tambahkan catatan singkat mengenai pengerjaan tugas..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Button variant="outline" size="sm" type="button" onClick={onCancel}>
                                Batal
                            </Button>
                            <Button size="sm" type="submit" className="gap-1.5">
                                <Send className="w-3.5 h-3.5" />
                                Kirim Tugas
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AssignmentSubmitForm;

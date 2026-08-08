import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
};

export const Toast = ({
    isVisible,
    message,
    type = 'success',
    onClose,
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-dark text-white rounded-xl shadow-2xl border border-slate-700/50 min-w-[300px]"
                >
                    {icons[type] || icons.info}
                    <p className="text-sm font-medium flex-1 text-slate-100">{message}</p>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
    progress = 0,
    showLabel = true,
    height = 'h-2.5',
    barColor = 'bg-primary',
    className = '',
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-muted">Progres Belajar</span>
                    <span className="text-primary font-bold">{clampedProgress}%</span>
                </div>
            )}
            <div className={`w-full ${height} bg-amber-100/60 rounded-full overflow-hidden p-0.5`}>
                <motion.div
                    className={`${height} ${barColor} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${clampedProgress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
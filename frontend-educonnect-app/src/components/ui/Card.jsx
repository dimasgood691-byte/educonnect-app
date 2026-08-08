import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
    children,
    className = '',
    hoverable = false,
    glass = false,
    onClick,
    ...props
}) => {
    return (
        <motion.div
            whileHover={hoverable ? { y: -4, boxShadow: '0 8px 30px rgba(255, 158, 0, 0.12)' } : {}}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClick}
            className={`
        rounded-2xl border border-slate-100/80 bg-card text-dark shadow-soft transition-all duration-200
        ${glass ? 'glass-effect' : ''}
        ${hoverable ? 'cursor-pointer hover:border-amber-200' : ''}
        ${className}
        `}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 pb-3 flex flex-col space-y-1.5 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-lg font-bold text-dark tracking-tight ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
    <p className={`text-xs text-muted leading-relaxed ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export default Card;
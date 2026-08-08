import React from 'react';

const badgeVariants = {
    primary: 'bg-accentSoft text-primary border-amber-200/80',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-600 border-amber-200/80',
    danger: 'bg-rose-50 text-rose-600 border-rose-200/80',
    info: 'bg-sky-50 text-sky-600 border-sky-200/80',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    className = '',
}) => {
    const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

    return (
        <span
            className={`
        inline-flex items-center gap-1 font-semibold rounded-full border transition-colors duration-150
        ${badgeVariants[variant] || badgeVariants.primary}
        ${sizeStyles}
        ${className}
        `}
        >
            {Icon && <Icon className="w-3 h-3 shrink-0" />}
            <span>{children}</span>
        </span>
    );
};

export default Badge;
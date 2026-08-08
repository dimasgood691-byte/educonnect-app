import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-hover border border-transparent',
    secondary: 'bg-accentSoft text-primary hover:bg-amber-100 border border-amber-200/60',
    outline: 'bg-transparent text-dark border border-slate-200 hover:border-primary hover:text-primary',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-dark',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md border border-transparent',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-6 py-3 text-base font-semibold rounded-xl gap-2.5',
};

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const isDisableState = disabled || isLoading;

    return (
        <motion.button
            type={type}
            whileHover={!isDisableState ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isDisableState ? { scale: 0.98 } : {}}
            disabled={isDisableState}
            onClick={onClick}
            className={`
        inline-flex items-center justify-center font-sans transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
        `}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-current" />
            ) : Icon && iconPosition === 'left' ? (
                <Icon className="w-4 h-4 shrink-0" />
            ) : null}

            <span>{children}</span>

            {!isLoading && Icon && iconPosition === 'right' && (
                <Icon className="w-4 h-4 shrink-0" />
            )}
        </motion.button>
    );
};

export default Button;
import React from 'react';

export const Input = ({
    label,
    error,
    type = 'text',
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-1.5 w-full">
            {label && (
                <label className="block text-xs font-bold text-dark">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-slate-400 ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="text-[10px] font-semibold text-rose-500">{error}</p>
            )}
        </div>
    );
};

export default Input;
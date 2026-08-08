import React from 'react';

export const SkeletonLoader = ({
    variant = 'text',
    width = 'w-full',
    height = 'h-4',
    className = '',
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'circle':
                return 'rounded-full';
            case 'card':
                return 'rounded-2xl h-48';
            case 'text':
            default:
                return 'rounded-md';
        }
    };

    return (
        <div
            className={`
        bg-slate-200/70 animate-pulse
        ${getVariantStyle()}
        ${width}
        ${height}
        ${className}
        `}
        />
    );
};

export default SkeletonLoader;
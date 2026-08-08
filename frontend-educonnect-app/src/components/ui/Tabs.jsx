import React from 'react';
import { motion } from 'framer-motion';

export const Tabs = ({
    tabs = [],
    activeTab,
    onChange,
    className = '',
}) => {
    return (
        <div className={`flex items-center gap-2 border-b border-slate-200/80 ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                relative px-4 py-2.5 text-sm font-semibold transition-colors duration-200
                ${isActive ? 'text-primary' : 'text-muted hover:text-dark'}
            `}
                    >
                        {tab.label}
                        {isActive && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
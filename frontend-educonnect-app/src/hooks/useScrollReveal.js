export const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: custom * 0.1,
            ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
        },
    }),
};

export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};
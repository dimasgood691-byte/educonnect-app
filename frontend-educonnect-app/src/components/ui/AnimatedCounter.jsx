import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export const AnimatedCounter = ({
    value = 0,
    duration = 2,
    prefix = '',
    suffix = '',
    decimals = 0,
    className = '',
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
    });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
            }
        });
    }, [springValue, prefix, suffix, decimals]);

    return <span ref={ref} className={`font-bold tracking-tight ${className}`}>{prefix}0{suffix}</span>;
};

export default AnimatedCounter;
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from 'react';

const AnimatedText = ({ text }) => {
    // splitting text into letters
    const letters = Array.from(text);
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: true, margin: "500px 0px 0px 0px" });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    // Variants for Container
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    // Variants for each letter
    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className={'text-3xl leading-[78px] overflow-hidden flex md:text-[60px] align-self-center text-nowrap font-black text-[#333333] dark:text-[#eeeeee]'}
            variants={container}
            ref={ref}
            animate={controls}
            initial="hidden"
        // initial="hidden"
        // whileInView="visible"
        // viewport={{ once: true }}
        // animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default AnimatedText;

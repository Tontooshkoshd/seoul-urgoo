import { motion } from "framer-motion";

export default function Reveal({
                                   as: Tag = "div",
                                   delay = 0,
                                   y = 40,
                                   scale = 1,
                                   children,
                                   className = "",
                               }) {
    const MotionTag = motion[Tag] || motion.div;
    return (
        <MotionTag
            initial={{ opacity: 0, y, scale }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </MotionTag>
    );
}

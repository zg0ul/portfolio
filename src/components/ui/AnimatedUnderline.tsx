import { motion } from 'motion/react';

function AnimatedUnderline() {
  return (
    <motion.div
      className="via-neon absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-transparent to-transparent"
      initial={{ width: "0%", x: "-50%" }}
      whileInView={{ width: "80%", x: "-50%" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    />
  );
}

export default AnimatedUnderline
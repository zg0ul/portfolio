import { motion } from "motion/react";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";

const VolunteeringHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mb-8 lg:mb-16 text-center"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="section-title:small relative inline-block text-center">
          Community Impact
          <AnimatedUnderline />
        </h2>
      </motion.div>
      <motion.p
        className="section-description:small mx-auto mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        Driving positive change through technical education, event leadership,
        and knowledge sharing
      </motion.p>
    </motion.div>
  );
};

export default VolunteeringHeader;

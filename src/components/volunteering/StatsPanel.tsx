import * as motion from "motion/react-client";
import { ImpactOverview, Quote } from "./ImpactOverview";
import Timeline from "./Timeline";

const StatsPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-full sm:order-last lg:order-first lg:col-span-1"
    >
      <div className="sticky top-8 flex h-full flex-col justify-between space-y-6">
        <ImpactOverview />
        <Quote />
        <Timeline />
      </div>
    </motion.div>
  );
};

export default StatsPanel;

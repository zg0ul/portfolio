import * as motion from "motion/react-client";
import { volunteeringData } from "./data";

const Timeline: React.FC = () => {
  return (
    <motion.div
      className="border-navy-500 bg-navy-800 hidden rounded-2xl border p-6 md:block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <h3 className="text-foreground mb-6 text-lg font-semibold">Timeline</h3>
      <div className="relative pl-6">
        <div className="from-navy-500/50 via-navy-400/50 to-navy-500/50 absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b"></div>

        {volunteeringData.map((item, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <div
              className={`bg-neon-10 absolute left-0 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full`}
            ></div>
            <p className="text-navy-200 text-sm font-medium">{item.period}</p>
            <p className="text-foreground text-base">{item.title}</p>
            <p className="text-navy-400 text-xs">{item.organization}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Timeline;

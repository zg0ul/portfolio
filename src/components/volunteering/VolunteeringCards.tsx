import * as motion from "motion/react-client";
import { VolunteeringItem } from "./data";

interface VolunteeringCardsProps {
  items: VolunteeringItem[];
}

const VolunteeringCards: React.FC<VolunteeringCardsProps> = ({ items }) => {
  return (
    <div className="space-y-8 lg:col-span-2">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.2 * index }}
        >
          <div className="group border-navy-500 bg-navy-800 hover:border-navy-400/50 relative h-full rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 sm:p-6 md:p-8">
            {/* Enhanced background pattern with subtle animation */}
            <div className={`absolute inset-0 rounded-2xl ${item.bgPattern}`} />

            {/* Header */}
            <div className="relative mb-6 flex flex-row items-start gap-5">
              {/* Icon */}
              <div
                className={`mb-0 inline-flex rounded-xl bg-gradient-to-br p-3 shadow-lg ${item.color}`}
              >
                <item.icon className="h-5 w-5" />
              </div>

              {/* Title and Organization */}
              <div className="flex-1">
                <h3 className="text-foreground mb-1 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-navy-300 text-sm">{item.organization}</p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="text-navy-400 flex items-center text-xs">
                    {item.period}
                  </span>
                  <span className="border-navy-500 bg-navy-700/80 text-navy-200 rounded-full border px-3 py-1 text-xs">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="relative space-y-2">
              {item.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.color} mt-1.5 flex-shrink-0 transition duration-300 group-hover:scale-125`}
                  />
                  <p className="text-foreground text-sm tracking-wide lg:text-base">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VolunteeringCards;

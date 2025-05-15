import { motion } from "motion/react";
import { BsStars } from "react-icons/bs";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  value: string | number;
  label: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  duration = 2.5,
  prefix = "",
  suffix = "",
}) => {
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store ref.current in a variable within the effect
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Increment key to force CountUp to remount and restart
          setKey((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    // Start observing
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup - use captured ref value
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Check if the value is a number or string that starts with a number
  const isCountable =
    typeof value === "number" || /^\d+/.test(value.toString());

  // Extract the numeric part if it's a string like "2+" or "400+"
  const numericValue = isCountable
    ? typeof value === "number"
      ? value
      : parseInt(value.toString().match(/\d+/)?.[0] || "0", 10)
    : 0;

  // Extract the suffix if there's a + or any other character after the number
  const valueSuffix =
    (typeof value === "string" && value.match(/\d+(.*)$/)?.[1]) || "";

  return (
    <div
      ref={ref}
      className="border-navy-500 bg-navy-700/50 rounded-xl border p-3"
    >
      <p className="text-foreground text-3xl font-bold">
        {isCountable ? (
          <>
            {prefix}
            <CountUp
              key={key}
              end={numericValue}
              duration={duration}
              separator=","
              start={0}
            />
            {valueSuffix}
            {suffix}
          </>
        ) : (
          <>
            {prefix}
            {value}
            {suffix}
          </>
        )}
      </p>
      <p className="text-navy-200 text-sm">{label}</p>
    </div>
  );
};

const ImpactOverview: React.FC = () => {
  return (
    <div className="border-navy-600 bg-navy-800 rounded-2xl border p-6 backdrop-blur-md">
      <h3 className="text-text-600 mb-6 flex items-center text-lg font-semibold">
        <BsStars className="text-neon mr-2" /> Impact Overview
      </h3>
      <div className="space-y-6">
        <StatItem value="2+" label="of dedicated service" suffix=" Years" />
        <StatItem value="400+" label="students impacted" />
        <StatItem value="3" label="student committees served" />
      </div>
    </div>
  );
};

const Quote: React.FC = () => {
  return (
    <motion.div
      className="group bg-navy-800 border-navy-600 relative overflow-hidden rounded-2xl border p-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Content */}
      <div className="relative z-10">
        <p className="border-navy-500 text-foreground/90 border-l-2 pl-3 text-sm italic">
          "The best way to find yourself is to lose yourself in the service of
          others." — Mahatma Gandhi
        </p>
      </div>
    </motion.div>
  );
};

export { ImpactOverview, Quote, StatItem };

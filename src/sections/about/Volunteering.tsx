import { ReactNode } from "react";
import VolunteeringHeader from "../../components/volunteering/VolunteeringHeader";
import StatsPanel from "../../components/volunteering/StatsPanel";
import VolunteeringCards from "../../components/volunteering/VolunteeringCards";
import { volunteeringData } from "../../components/volunteering/data";

const Background: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="relative py-24">
      {/* Background decoration - removed overflow-hidden */}
      <div className="absolute inset-0 -z-10">
        <div className="from-navy-300/10 to-navy-400/10 absolute top-10 -left-25 h-84 w-84 rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-navy-300/10 to-navy-400/10 absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-br blur-3xl" />
      </div>
      {children}
    </section>
  );
};

const VolunteeringSection: React.FC = () => {
  return (
    <Background>
      <div className="container mx-auto">
        <VolunteeringHeader />

        <div className="mx-auto">
          <div className="grid grid-cols-1 md:gap-8 lg:grid-cols-3">
            <StatsPanel />
            <VolunteeringCards items={volunteeringData} />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default VolunteeringSection;

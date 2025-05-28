import Bento from "@/sections/home/Bento";
import ContactForm from "@/sections/home/ContactForm";
import Hero from "@/sections/home/Hero";
import Approach from "@/sections/home/Approach";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import AboutPageExperience from "@/sections/about/Experience";

const PortfolioPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <Hero />

    <Bento />

    <AboutPageExperience />

    <FeaturedProjects />

    <Approach />
    
    <ContactForm />
  </div>
);

export default PortfolioPage;

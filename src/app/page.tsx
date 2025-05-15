import Bento from "@/sections/home/Bento";
import ContactForm from "@/sections/home/ContactForm";
import Hero from "@/sections/home/Hero";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import AboutPageExperience from "@/sections/about/Experience";

const PortfolioPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <Hero />

    <Bento />

    <AboutPageExperience />

    <FeaturedProjects />

    <ContactForm />
  </div>
);

export default PortfolioPage;

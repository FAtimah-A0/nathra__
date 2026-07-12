import './App.css';
import Navbar from './components/Navbar';
import Particles from './components/Particles';
import HeroSection from './components/HeroSection';
import ValueSection from './components/ValueSection';
import RoadmapSection from './components/RoadmapSection';
import {
  OutcomesSection,
  ScheduleSection,
  SocialProofSection,
  TrainersSection,
  PricingSection,
  FinalCTASection,
  Footer,
} from './components/LandingSections';

export default function App() {
  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <Particles />
      <Navbar />
      <main>
        <HeroSection />
        <ValueSection />
        <RoadmapSection />
        <ScheduleSection />
        <OutcomesSection />
        <SocialProofSection />
        <TrainersSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}

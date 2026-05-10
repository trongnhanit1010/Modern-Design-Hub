import HeroSlider from "@/components/sections/HeroSlider";
import LocationSelector from "@/components/sections/LocationSelector";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import AttractiveDestinations from "@/components/sections/AttractiveDestinations";
import CategoriesSection from "@/components/sections/CategoriesSection";
import DealsSection from "@/components/sections/DealsSection";
import WhereToGo from "@/components/sections/WhereToGo";
import WeatherSection from "@/components/sections/WeatherSection";
import HotelsCarousel from "@/components/sections/HotelsCarousel";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import EventCalendar from "@/components/sections/EventCalendar";
import TouristMap from "@/components/sections/TouristMap";
import NeedToKnow from "@/components/sections/NeedToKnow";
export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSlider />
      <LocationSelector />
      <FeaturedGrid />
      <AttractiveDestinations />
      <CategoriesSection />
      <DealsSection />
      <WhereToGo />
      <WeatherSection />
      <HotelsCarousel />
      <ExperiencesSection />
      <EventCalendar />
      <TouristMap />
      <NeedToKnow />
    </main>
  );
}

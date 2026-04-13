import HeroSlider from "@/components/sections/HeroSlider";
import LocationSelector from "@/components/sections/LocationSelector";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import CategoriesSection from "@/components/sections/CategoriesSection";
import DealsSection from "@/components/sections/DealsSection";
import WhereToGo from "@/components/sections/WhereToGo";
import WeatherSection from "@/components/sections/WeatherSection";
import HotelsCarousel from "@/components/sections/HotelsCarousel";
import EventCalendar from "@/components/sections/EventCalendar";
import TouristMap from "@/components/sections/TouristMap";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSlider />
      <LocationSelector />
      <FeaturedGrid />
      <CategoriesSection />
      <DealsSection />
      <WhereToGo />
      <WeatherSection />
      <HotelsCarousel />
      <EventCalendar />
      <TouristMap />
      <Footer />
    </main>
  );
}

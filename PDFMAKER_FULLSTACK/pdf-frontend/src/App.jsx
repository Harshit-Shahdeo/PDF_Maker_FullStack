import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ToolGrid from './components/ToolGrid';
import ImageToPDFSection from './components/ImageToPDFSection';
import SEOSection from './components/SEOSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ToolGrid />
      <ImageToPDFSection />
      <SEOSection />
      <Footer />
    </div>
  );
}
import Digp from "./components/Digp/Digp";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import LatestAnnouncement from "./components/LatestAnnouncement/LatestAnnouncement";
import Navbar from "./components/Navbar/Navbar";
import QuickLinks from "./components/QuickLinks/QuickLinks";
// import Check from "./components/check/check";

function App() {
  return (
    <div className="min-h-screen ">
    
     <div className="relative">
      <Navbar />
      
      <div className="pt-0"> 
        <ImageSlider />
       
      </div>
    </div>
      <Hero />
    
      <Digp/>
      <QuickLinks/>
      <LatestAnnouncement/>
      <Footer/>
    
    </div>
  );
}

export default App;
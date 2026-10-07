import AIDayPlanning from "../../components/AIDayPlanning";
import Banner from "../../components/Banner";
import FAQ from "../../components/FAQ";
import Featured from "../../components/Featured";
import Footer from "../../components/Footer";
import HowItWorks from "../../components/HowItWorks";
import Navbar from "../../components/Navbar";
import NextStudySession from "../../components/NextStudySession";
import Pricing from "../../components/Pricing";
import Review from "../../components/Review";
import Stats from "../../components/Stats";
import Studying from "../../components/Studying";

function Homepage() {
  return (
    <div>
      <Banner />
      <Stats />
      <Studying />
      <Featured />
      <HowItWorks />
      <AIDayPlanning />
      <Review />
      <Pricing />
      <FAQ />
      <NextStudySession />
    </div>
  );
}

export default Homepage;

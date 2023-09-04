import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/homePage/Hero";
import Main from "../../components/homePage/Main";
import Footer from "../../components/footer/Footer";
import './homePage.scss'

function HomePage() {
  return (
    <div className="homepage">
      <header>
        <Navbar />
      </header>
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}

export default HomePage;

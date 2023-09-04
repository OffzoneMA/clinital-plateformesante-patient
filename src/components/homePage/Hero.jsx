import React from "react";
import { useState, useEffect } from "react";
import SearchBarDoc from "../searchBarDoc/SearchBarDoc";
function Hero() {
  const [heroCarc, setHeroCarc] = useState();
  const [heroBg, setHeroBg] = useState();

  // Random carac & background
  useEffect(() => {
    // Random caractere
    const randomNumber_1 = Math.floor(Math.random() * 2);
    randomNumber_1
      ? setHeroCarc("3d-doctor-1.png")
      : setHeroCarc("3d-doctor-2.png");
    // Random background
    const randomNumber_2 = Math.floor(Math.random() * 2);
    randomNumber_2 ? setHeroBg("bg-1.png") : setHeroBg("bg-2.jpg");
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <div className="content">
          <h1
            style={
              heroBg === "bg-1.png" ? { color: "#303030" } : { color: "white" }
            }
          >
            Réservez une consultation physique, vidéo ou à domicile chez un
            professionnel de santé
          </h1>
          <SearchBarDoc comp='hero' />
        </div>
        <div className="doc-img">
          <img src={`../images/${heroCarc}`} alt="" />
        </div>
      </div>
      <div className="bg">
        <img src={`../images/${heroBg}`} alt="" />
      </div>
    </div>
  );
}

export default Hero;

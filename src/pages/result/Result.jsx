import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Map from "react-map-gl";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PriseRdv from "../../components/result/priseRdv/PriseRdv";
import DoctorResult from "../../components/result/DoctorResult";
import SearchBarDoc from "../../components/searchBarDoc/SearchBarDoc";

import "mapbox-gl/dist/mapbox-gl.css";
import "./result.scss";
import LoginModal from "../../components/Modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToggle } from "../../utils/redux/GlobalSlice";

function Result() {
  const url = window.location.search;
  const [result, setResult] = useState([]);
  // const [search, setSearch] = useState({ city: "", spec: "" });
  const [s_Params, setS_Params] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageBar, setPageBar] = useState({ pages: [], items: [] });
  const filterBar = useRef();
  const [randomX, setRandomX] = useState();
  const [params] = useSearchParams();

  // Get search params & fetch search result
  const searchDoc = () => {
    const id_ville = params.get("id_ville");
    const page = Number(params.get("page"));
    const search = params.get("search");
    const ville = params.get("ville");

    setS_Params({
      id_ville: id_ville,
      search: search,
      ville: ville,
      page: page,
    });

    // Generate API link
    var link;
    if (id_ville) {
      link = `https://apidb.clinital.io/api/med/medByVille?id_ville=${id_ville}`;
    }
    if (search && !ville) {
      link = `https://apidb.clinital.io/api/med/medByNameOrSpec?search=${search}`;
    }
    if (search && ville) {
      link = `https://apidb.clinital.io/api/med/medByNameOrSpecAndVille?search=${search}&ville=${ville}`;
    }

    // Set search values to the input
    // setSearch({ city: ville || id_ville, spec: search || "" });

    // Fetch result
    const fetchResult = async () => {
      setLoading(true);
      try {
        const respond = await axios.get(link);
        console.log(respond.data)
        setResult(respond.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      }
    };
    fetchResult();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => searchDoc(), [randomX]);

  // Generate array of page numbers
  useEffect(() => {
    const pagesItems = () => {
      const pageNbr = Math.ceil(result.length / 6);

      var pageArray = [];
      for (let i = 0; i < pageNbr; i++)
        pageArray.push((s_Params.page - 1) * 6 + i + 1);

      var itemArray = [];
      for (let i = 0; i < (6 && result.length); i++)
        itemArray.push((s_Params.page - 1) * 6 + i + 1);

      setPageBar({ pages: pageArray, items: itemArray });
    };
    pagesItems();
  }, [result.length, s_Params.page]);

  // Generate page link on click to the page button
  const generatePageLink = (page) => {
    if (url.includes("page")) {
      const indexPage = url.indexOf("&page=") + 6;
      const newUrl = url.replace("page=" + url[indexPage], `page=${page}`);
      return newUrl;
    } else return url + "&page=1";
  };

  // Generate page link on click to next or prev button
  const changePage = (value) => {
    if (url.includes("page")) {
      const indexPage = url.indexOf("&page=") + 6;
      const newUrl = url.replace(
        "page=" + url[indexPage],
        `page=${s_Params.page + value}`
      );
      window.location = newUrl;
    } else window.location = url + "&page=1";
  };

  const toggleOptin = (e) => e.target.classList.toggle("active");

  // console.log(result);
  const {logintoggle}=useSelector((state)=>state.global.logintoggle);
  const dispatch=useDispatch();
  const handleCloseModal=()=>{
    dispatch(setLoginToggle(!logintoggle));
  }
  useEffect(() => {
    console.log("login ")
    console.log('logintoggle:', logintoggle)
  }, [logintoggle]);
  return (
    <div className="result">
      <Navbar />
      <div className="result-container">
      {logintoggle && <LoginModal isOpen={logintoggle} onClose={handleCloseModal} />}
        <div className="search">
          <SearchBarDoc setRandomX={setRandomX} />
        </div>
        <div className="container">
          <div className="filter-bar">
            <div className="bar-container" ref={filterBar}>
              <div className="filter-title">
                <img src="../../icons/filter.svg" alt="" />
                FILTER PAR
              </div>

              <details>
                <summary>
                  Disponibilité
                  <img src="../../icons/flech-black.svg" alt="" />
                </summary>
                <div className="detail">
                  <span onClick={toggleOptin}>
                    Dans les deux prochains jours
                  </span>
                  <span onClick={toggleOptin}>En Week-end</span>
                  <span onClick={toggleOptin}>En semaine</span>
                </div>
              </details>

              <details>
                <summary>
                  Motif de consultation
                  <img src="../../icons/flech-black.svg" alt="" />
                </summary>
                <div className="detail">
                  <span onClick={toggleOptin}>Première consultation</span>
                  <span onClick={toggleOptin}>Consultation de suivi</span>
                  <span onClick={toggleOptin}>Urgence</span>
                </div>
              </details>

              <details>
                <summary>
                  Langues parlées
                  <img src="../../icons/flech-black.svg" alt="" />
                </summary>
                <div className="detail">
                  <span onClick={toggleOptin}>العربية</span>
                  <span onClick={toggleOptin}>Amazigh</span>
                  <span onClick={toggleOptin}>Français</span>
                  <span onClick={toggleOptin}>Anglais</span>
                  <span onClick={toggleOptin}>Espagnol</span>
                  <span onClick={toggleOptin}>Italien</span>
                  <span onClick={toggleOptin}>Allemand</span>
                  <span onClick={toggleOptin}>Turc</span>
                  <span onClick={toggleOptin}>Russe</span>
                </div>
              </details>
            </div>
          </div>
          <div className="content">
            <div className="content-wrapper">
              <div className="rdvs-container">
                {loading
                  ? "Loading..."
                  : !result.length
                  ? "Aucun résultat"
                  : pageBar.items.map(
                      (x, index) =>
                        !loading && (
                          <div key={index}>
                            {result[x - 1] && (
                              <DoctorResult item={result[x - 1]} />
                            )}
                          </div>
                        )
                    )}
                {!loading && (
                  <>
                    <div>
                      <DoctorResult type={1} />
                    </div>
                    <div>
                      <DoctorResult type={2} />
                    </div>
                  </>
                )}
              </div>
              <div className="page-numbers">
                <div className="number-container">
                  {pageBar.pages.lenght < 0 && (
                    <img
                      className={s_Params.page <= 1 ? "disable" : ""}
                      src="../../icons/flech-white.svg"
                      alt=""
                      onClick={() => changePage(-1)}
                    />
                  )}
                  {pageBar.pages.map((x, index) => (
                    <a
                      key={index}
                      className=""
                      href={generatePageLink(index + 1)}
                    >
                      {index + 1}
                    </a>
                  ))}
                </div>
                {pageBar.pages.lenght < 0 && (
                  <div
                    onClick={() => changePage(+1)}
                    className={
                      s_Params.page === pageBar.pages.length
                        ? "disable next"
                        : "next"
                    }
                  >
                    <span>Page Suivante</span>
                    <img src="../../icons/flech-white.svg" alt="" />
                  </div>
                )}
              </div>
            </div>
            <div className="map-container">
              <Map
                initialViewState={{
                  longitude: -7.4,
                  latitude: 33.6,
                  zoom: 10,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1IjoibWFyd2FuZW5oIiwiYSI6ImNsNndwYjZjOTBhdXMzam8xc3psdzhvYTEifQ.BNnvlSlxD2Zo8X9i9FVdMw"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Routes>
        <Route exact path="/prise-rdv/" element={<PriseRdv />} />
      </Routes>
    </div>
  );
}

export default Result;

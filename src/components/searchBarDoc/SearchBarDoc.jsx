import React, { useReducer, useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Mark from "mark.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import './searchBarDoc.scss'

const reducer = (state, action) => {
  switch (action.type) {
    case "CITY_FETCH":
      return { ...state, city: { ...state.city, loading: true } };
    case "CITY_SUCCESS":
      return {
        ...state,
        city: { ...state.city, loading: false, items: action.payload },
      };
    case "CITY_FAIL":
      return {
        ...state,
        city: { ...state.city, loading: false, error: action.payload },
      };
    case "SPEC_FETCH":
      return { ...state, spec: { ...state.spec, loading: true } };
    case "SPEC_SUCCESS":
      return {
        ...state,
        spec: { ...state.spec, loading: false, items: action.payload },
      };
    case "SPEC_FAIL":
      return {
        ...state,
        spec: { ...state.spec, loading: false, error: action.payload },
      };
    default:
      return state;
  }
};

function SearchBarDoc({ setRandomX, comp }) {
  const [{ city, spec }, dispatch] = useReducer(reducer, {
    city: {
      items: [],
      loading: false,
      error: "false",
    },
    spec: {
      items: [],
      loading: false,
      error: "false",
    },
  });

  const [searchParams] = useSearchParams();
  const ville_params = searchParams.get("ville");
  const search_params = searchParams.get("search");
  const id_ville_params = searchParams.get("id_ville");
  const id_ville_name_params = searchParams.get("id_ville_name");
  const [search, setSearch] = useState({
    city: ville_params || id_ville_name_params || "",
    spec: search_params || "",
  });

  const citySearchContainer = useRef();
  const specSearchContainer = useRef();
  const navigate = useNavigate();

  // Fetch citys & speciality
  useEffect(() => {
    const cityFetch = async () => {
      dispatch({ type: "CITY_FETCH" });
      try {
        const citys = await axios.get(
          "https://apidb.clinital.io/api/ville/allvilles"
        );
        dispatch({ type: "CITY_SUCCESS", payload: citys.data });
      } catch (error) {
        dispatch({ type: "CITY_FAIL", payload: error });
      }
    };
    cityFetch();
    const specFetch = async () => {
      dispatch({ type: "SPEC_FETCH" });
      try {
        const citys = await axios.get(
          "https://apidb.clinital.io/api/med/getAllSpec"
        );
        dispatch({ type: "SPEC_SUCCESS", payload: citys.data });
        // console.log(spec.items);
      } catch (error) {
        dispatch({ type: "SPEC_FAIL", payload: error });
      }
    };
    specFetch();
    window.scrollTo(0, 0);
  }, []);

  // Filter citys
  const filterSearch = (array, search, param) => {
    const x = array && array.toLowerCase();
    const newArray = search.filter((item) =>
      item[param]
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(x)
    );
    const y = !array ? [] : newArray;
    return y;
  };
  // Mark citys
  const handleSeach = (array, container) => {
    const context = container.current;
    const instance = new Mark(context);
    if (array && city.items) instance.unmark(array);
    if (array && city.items && !city.loading) instance.mark(array);
  };
  // Toggle search
  const toggleSeach = (e) => {
    const { name, value } = e.target;
    setSearch((x) => {
      return { ...x, [name]: value };
    });
  };
  const toggleSeachOnClick = (name, libelle) => {
    setSearch((y) => {
      return { ...y, [name]: libelle, villeName: '' };
    });
  };

  // Mark on typing
  useEffect(() => {
    handleSeach(search.city, citySearchContainer);
    handleSeach(search.spec, specSearchContainer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, city.items]);

  const showResult = async (e) => {
    e.preventDefault();
    var link;
    const citySelected = city.items.filter(
      (element) => element.nom_ville === search.city
    )[0];
    if (search.city && !search.spec) {
      link = `/result?id_ville=${citySelected.id_ville}&id_ville_name=${search.city}&page=1`;
    }
    if (!search.city && search.spec) {
      link = `/result?search=${search.spec}&page=1`;
    }
    if (search.city && search.spec) {
      link = `/result?search=${search.spec.trim()}&ville=${search.city}&page=1`;
    }
    // Search
    comp !== "hero" && setRandomX(Math.random());
    // Toggle search Link
    link && navigate(link.trim());
  };
  return (
    <form className="search-section">
      <div>
        <img src="../../icons/search.svg" alt="" />
        <input
          type="text"
          name="spec"
          value={search.spec}
          onChange={(e) => toggleSeach(e)}
          placeholder="Médecin, établissement, spécialité"
        />
        <div className="result" ref={specSearchContainer}>
          {spec.loading ? (
            <span className="loading">Loading...</span>
          ) : (
            filterSearch(search.spec, spec.items, "libelle").map((x, index) => (
              <span
                key={index}
                onClick={() => toggleSeachOnClick("spec", x.libelle)}
              >
                {x.libelle}
              </span>
            ))
          )}
        </div>
      </div>

      <div>
        <img src="../../icons/location-outline.svg" alt="" />
        <input
          type="text"
          name="city"
          onChange={(e) => toggleSeach(e)}
          value={search.city}
          placeholder="Où ?"
        />
        <div className="result" ref={citySearchContainer}>
          {city.loading ? (
            <span className="loading">Loading...</span>
          ) : (
            filterSearch(search.city, city.items, "nom_ville").map(
              (x, index) => (
                <span
                  key={index}
                  onClick={() => toggleSeachOnClick("city", x.nom_ville)}
                >
                  {x.nom_ville}
                </span>
              )
            )
          )}
        </div>
      </div>

      <button onClick={(e) => showResult(e)}>
        {comp === "hero" ? (
          <>
            Rechercher
            <img src="../../icons/flech-white.svg" alt="" />
          </>
        ) : (
          <img src="../../icons/search-outline.svg" alt="" />
        )}
      </button>
    </form>
  );
}

export default SearchBarDoc;

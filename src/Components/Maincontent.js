import React from "react";
import "./MainContent.css";
import Countries from "./Countries.js";
import ModalCountry from "./ModalCountry.js";
import { useState, useEffect } from "react";
import axios from "axios";

const Maincontent = ({ toggle,setToggle }) => {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("https://restcountries.com/v3.1/all");
      setFetchedData(data.data);
    };
    getData();
  }, []);

  const [modalActive, setModalActive] = useState(false);
  const [inputData, setInputData] = useState("");
  const [optionsData, setOptionsData] = useState("");
  const [countryData, setCountryData] = useState({});

  return (
    <div
      className="main_content"
      style={{
        backgroundColor: toggle ? "hsl(207, 26%, 17%)" : "white",
        color: toggle ? "white" : "black",
      }}
    >
      <div className="options">
        <div
          className="search_country_container"
          style={{
            backgroundColor: toggle ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 98%)",
            color: toggle ? "white" : "hsl(200, 15%, 8%)",
          }}
        >
          <svg
            fill={toggle ? "white" : "hsl(0, 0%, 52%)"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="search_country_svg"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path>
          </svg>
          <input
            className={
              toggle
                ? "black search_country_input"
                : "white search_country_input"
            }
            type="text"
            name="countryInput"
            placeholder="Search for a country..."
            onChange={(event) => setInputData(event.target.value)}
          ></input>
        </div>
        <select
          style={{
            backgroundColor: toggle ? "hsl(209, 23%, 22%)" : "white",
            color: toggle ? "white" : "hsl(200, 15%, 8%)",
          }}
          className="options_select"
          name="regions"
          id="region"
          onChange={(event) => {
            setOptionsData(event.target.value);
          }}
        >
          <option value="">All regions</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antarctic</option>
        </select>
      </div>
      <Countries
        fetchedData={fetchedData}
        inputData={inputData}
        optionsData={optionsData}
        countryData={countryData}
        setModalActive={setModalActive}
        setCountryData={setCountryData}
        toggle={toggle}
      />
      {modalActive && (
        <ModalCountry
          countryData={countryData}
          fetchedData={fetchedData}
          setModalActive={setModalActive}
          setCountryData={setCountryData}
          toggle={toggle}
          setToggle={setToggle}
        />
      )}
    </div>
  );
};

export default Maincontent;

import React from "react";
import "./Country.css";

function Country({
  toggle,
  setModalActive,
  setCountryData,
  index,
  countryData,
  fetchedData,
  countryCardData,
}) {
  const clickHandler = (e) => {
    setModalActive(true);
    let element,
      borderCountryArr = [],
      borderNameArr = [],
      id = e.nativeEvent.path[1].id;
    fetchedData.map((data) => {
      if (data.ccn3 === id) element = data;
    });

    if (element.borders) {
      Object.values(element.borders).map((country) =>
        borderCountryArr.push(country)
      );
    }

    borderCountryArr.map((item) => {
      fetchedData.map((country) => {
        if (country.cca3 === item) {
          borderNameArr.push(country.name.common);
        }
      });
    });

    setCountryData({
      ...countryData,
      borderCountries: borderNameArr,
      src: element.flags.png,
      name: element.name.common,
      nativeName: Object.values(element.name.nativeName)[0].common,
      population: element.population
        .toString()
        .replace(/(.)(?=(\d{3})+$)/g, "$1,"),
      region: element.region,
      subRegion: element.subregion,
      capital: element.capital,
      tld: element.tld,
      currencies: Object.values(element.currencies)[0].name,
      languages: Object.values(element.languages) + "  ",
    });
  };
  return (
    <div className="country_card" id={index} onClick={clickHandler}>
      <img
        id={index}
        className="country_image"
        src={countryCardData.src}
        alt=""
      ></img>
      <div
        id={index}
        className={toggle ? "black country_data" : "white country_data"}
      >
        <h2 id={index} className="country_data_title">
          {countryCardData.name}
        </h2>
        <h3 id={index} className="country_data_population">
          Population: <span>{countryCardData.population}</span>
        </h3>
        <h3 id={index} className="country_data_region">
          Region: <span>{countryCardData.region}</span>
        </h3>
        <h3 id={index} className="country_data_capital">
          Capital: <span>{countryCardData.capital}</span>
        </h3>
      </div>
    </div>
  );
}

export default Country;

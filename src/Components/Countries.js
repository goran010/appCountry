import React from "react";
import "./Countries.css";
import Country from "./Country.js";
const Countries = ({
  setModalActive,
  inputData,
  fetchedData,
  optionsData,
  setCountryData,
  countryData,
  toggle,
}) => {
  return (
    <div
      className={
        toggle ? "black1 country_container" : "white  country_container"
      }
    >
      {fetchedData
        .filter((item) => {
          if (
            inputData === "" ||
            item.name.common
              .toString()
              .toUpperCase()
              .includes(inputData.toString().toUpperCase())
          )
            return item;
        })
        .filter((item) => {
          if (
            (optionsData === "" ||
              item.region
                .toString()
                .toUpperCase()
                .includes(optionsData.toString().toUpperCase())) &&
            item.name.common !== "Kosovo"
          ) {
            return item;
          }
          return false;
        })
        .map((item, i) => (
          <Country
            toggle={toggle}
            key={i}
            setModalActive={setModalActive}
            countryCardData={{
              src: item.flags.png,
              name: item.name.common,
              region: item.region,
              population: item.population
                .toString()
                .replace(/(.)(?=(\d{3})+$)/g, "$1,"),
              capital: item.capital,
            }}
            index={item.ccn3}
            fetchedData={fetchedData}
            countryData={countryData}
            setCountryData={setCountryData}
          />
        ))}
    </div>
  );
};
export default Countries;

import React from "react";
import "./ModalCountry.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
function ModalCountry({
  toggle,
  setModalActive,
  countryData,
  fetchedData,
  setCountryData,
  setToggle,
}) {
  //
  const values = [true, "xs-down","sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setModalActive(true);
  }
  //
  const clickHandler = (e) => {
    let element,
      borderCountryArr = [],
      borderNameArr = [],
      eventName = e.nativeEvent.path[0].innerText;
    fetchedData.map((data) => {
      if (data.name.common === eventName) element = data;
      return false;
    });

    Object.values(element.borders).map((data) => {
      borderCountryArr.push(data);
    });

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
      languages: Object.values(element.languages),
    });
  };
  return (
    <>
      country
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Full screen
          {typeof v === "string" && `below ${v.split("-")[0]}`}
        </Button>
      ))}
      <Modal show={true} fullscreen={true} onHide={() => setModalActive(false)}>
        <Header toggle={toggle} setToggle={setToggle} />
        <Modal.Body className={toggle ? "black3" : "white1"}>
          <div
            className={toggle ? "black3 modalContent" : "white1 modalContent"}
          >
            <button
              closeButton
              className={toggle ? "modal-btn" : "modal-btn"}
              style={{
                backgroundColor: toggle ? "hsl(209, 23%, 22%)" : "white",
                color: toggle ? "white" : "hsl(200, 15%, 8%)",
              }}
              onClick={() => setModalActive(false)}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={toggle ? "white" : "hsl(200, 15%, 8%)"}
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              Back
            </button>
            <div className="country-data">
              <img
                className="modal-img"
                src={countryData.src}
                alt="modal-img"
              ></img>
              <div className="aside">
                <div className="country-data-firstDiv ">
                  <h1> {countryData.name}</h1>
                  <h3>
                    Native name: <span>{countryData.nativeName}</span>
                  </h3>
                  <h3>
                    Population: <span>{countryData.population}</span>
                  </h3>
                  <h3>
                    Region: <span>{countryData.region}</span>
                  </h3>
                  <h3>
                    Sub region: <span>{countryData.subRegion}</span>
                  </h3>
                  <h3>
                    Capital: <span>{countryData.capital}</span>
                  </h3>
                </div>
                <div className="country-data-secondDiv">
                  <h3 className="modal-country-data-topLevelDomain">
                    Top Level Domain: <span>{countryData.tld}</span>
                  </h3>
                  <h3>
                    Currencies: <span>{countryData.currencies}</span>
                  </h3>
                  <h3>
                    Languages: <span>{countryData.languages}</span>
                  </h3>
                </div>
                <div className="modal-border-countries">
                  <h3>Border Countries: </h3>
                  <div>
                    {countryData.borderCountries.map((item, i) => {
                      return (
                        <button
                          style={{
                            backgroundColor: toggle
                              ? " hsl(209, 23%, 22%)"
                              : "white",
                            color: toggle ? "white" : "hsl(200, 15%, 8%)",
                          }}
                          className={toggle ? "modal-btn" : "modal-btn"}
                          key={i}
                          onClick={clickHandler}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCountry;

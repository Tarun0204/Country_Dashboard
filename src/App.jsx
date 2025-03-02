import React, { useState } from "react";
import CountryList from "./components/CountryList"
import "./App.css"

const App = () => {
  const [countries, setCountries] = useState([]);

  const addCountry = () => {
    const countryName = prompt("Enter country name:");
    if (countryName) {
      setCountries([
        ...countries,
        { id: Date.now(), name: countryName, states: [] },
      ]);
    }
  };

  const editCountry = (id) => {
    const newName = prompt("Enter new country name:");
    if (newName && window.confirm("Are you sure you want to update?")) {
      setCountries(
        countries.map((country) =>
          country.id === id ? { ...country, name: newName } : country
        )
      );
    }
  };

  const deleteCountry = (id) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      setCountries(countries.filter((country) => country.id !== id));
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-heading">Country, State & City Management</h1>
      <button type="button" className="add-country-button" onClick={addCountry}>Add Country</button>
      <CountryList
        countries={countries}
        editCountry={editCountry}
        deleteCountry={deleteCountry}
        setCountries={setCountries}
      />
    </div>
  );
};

export default App;

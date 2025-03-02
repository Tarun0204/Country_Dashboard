import React from "react";
import StateList from "./StateList";
import "../styles/CountryList.css";
import Empty from "../assets/Empty.png";

const CountryList = ({ countries, deleteCountry, setCountries }) => {
  const updateCountry = (countryId, currentName) => {
    const newName = prompt("Enter new country name:", currentName);
    if (newName && window.confirm("Are you sure you want to update?")) {
      setCountries((prev) =>
        prev.map((country) =>
          country.id === countryId ? { ...country, name: newName } : country
        )
      );
    }
  };

  return (
    <div className="countries-container">
      {countries.length === 0 ? (
        <div className="empty-view">
          <img className="empty-img" src={Empty} alt="No countries available" />
          <p className="empty-para">
            No countries available. Countries added will be displayed here!!
          </p>
        </div>
      ) : (
        <>
          <h2 className="country-heading">Countries Table</h2>
          <table className="country-table" border="1" cellPadding="5">
            <thead className="country-headings">
              <tr className="country-rows">
                <th className="country-sub-heading">Country Name</th>
                <th className="country-sub-heading">Actions</th>
                <th className="country-sub-heading">States</th>
              </tr>
            </thead>
            <tbody className="country-table-body">
              {countries.map((country) => (
                <tr key={country.id} className="country-body-row">
                  <td className="country-para">{country.name}</td>
                  <td>
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => updateCountry(country.id, country.name)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteCountry(country.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <StateList country={country} setCountries={setCountries} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CountryList;

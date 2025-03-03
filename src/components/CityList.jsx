import React from "react";

const CityList = ({ country, state, setCountries }) => {
  const updateStateCities = (callback) => {
    setCountries((prev) =>
      prev.map((c) =>
        c.id === country.id
          ? {
              ...c,
              states: c.states.map((s) =>
                s.id === state.id ? { ...s, cities: callback(s.cities) } : s
              ),
            }
          : c
      )
    );
  };

  const addCity = () => {
    const cityName = prompt("Enter city name:");
    if (cityName) {
      updateStateCities((cities) => [
        ...cities,
        { id: Date.now(), name: cityName },
      ]);
    }
  };

  const deleteCity = (cityId) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      updateStateCities((cities) =>
        cities.filter((city) => city.id !== cityId)
      );
    }
  };

  const updateCity = (cityId, currentName) => {
    const newName = prompt("Enter new city name:", currentName);
    if (newName && window.confirm("Are you sure you want to update?")) {
      updateStateCities((cities) =>
        cities.map((city) =>
          city.id === cityId ? { ...city, name: newName } : city
        )
      );
    }
  };

  return (
    <div>
      <button type="button" className="add-state-btn" onClick={addCity}>
        Add City
      </button>
      <table cellPadding="5">
        <thead>
          <tr>
            <th>City Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.cities.map(({ id, name }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => updateCity(id, name)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteCity(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityList;

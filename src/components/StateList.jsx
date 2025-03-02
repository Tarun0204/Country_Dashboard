import React from "react";
import CityList from "./CityList";
import "../styles/StateList.css";

const StateList = ({ country, setCountries }) => {
  const addState = () => {
    const stateName = prompt("Enter state name:");
    if (stateName) {
      setCountries((prev) =>
        prev.map((c) =>
          c.id === country.id
            ? {
                ...c,
                states: [
                  ...c.states,
                  { id: Date.now(), name: stateName, cities: [] },
                ],
              }
            : c
        )
      );
    }
  };

  const editState = (stateId, currentName) => {
    const newStateName = prompt("Enter new state name:", currentName);
    if (newStateName && window.confirm("Are you sure you want to update?")) {
      setCountries((prev) =>
        prev.map((c) =>
          c.id === country.id
            ? {
                ...c,
                states: c.states.map((s) =>
                  s.id === stateId ? { ...s, name: newStateName } : s
                ),
              }
            : c
        )
      );
    }
  };

  const deleteState = (stateId) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      setCountries((prev) =>
        prev.map((c) =>
          c.id === country.id
            ? { ...c, states: c.states.filter((s) => s.id !== stateId) }
            : c
        )
      );
    }
  };

  return (
    <div>
      <button onClick={addState} type="button" className="add-state-btn">
        Add State
      </button>
      <table className="state-container" border="1" cellPadding="5">
        <thead className="state-headings">
          <tr className="state-rows">
            <th>State Name</th>
            <th>Actions</th>
            <th>Cities</th>
          </tr>
        </thead>
        <tbody className="state-body">
          {country.states.map((state) => (
            <tr key={state.id}>
              <td>{state.name}</td>
              <td>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => editState(state.id, state.name)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteState(state.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <CityList
                  country={country}
                  state={state}
                  setCountries={setCountries}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StateList;

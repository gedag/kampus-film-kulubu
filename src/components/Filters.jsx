import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const Filters = () => {
  const { state, dispatch } = useAppContext();
  const { filters } = state;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_FILTERS',
      payload: { [name]: value }
    });
  };

  return (
    <div className="filters">
      <input
        type="text"
        name="language"
        value={filters.language}
        onChange={handleFilterChange}
        placeholder="Dil (örn: English)"
      />
      <input
        type="text"
        name="genre"
        value={filters.genre}
        onChange={handleFilterChange}
        placeholder="Tür (örn: Drama)"
      />
      <input
        type="number"
        name="minRating"
        value={filters.minRating}
        onChange={handleFilterChange}
        placeholder="Min Puan (0-10)"
        min="0"
        max="10"
        step="0.1"
      />
    </div>
  );
};

export default Filters;
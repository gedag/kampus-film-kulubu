import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const SearchBox = () => {
  const { dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); 
    dispatch({ type: 'SET_QUERY', payload: searchTerm });
  };

  return (
    <form onSubmit={handleSearch} className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Dizi ara (örn: 'star wars')"
      />
      <button type="submit">
        Ara
      </button>
    </form>
  );
};

export default SearchBox;
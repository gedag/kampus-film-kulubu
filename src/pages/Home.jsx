import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext.jsx';

import SearchBox from '../components/SearchBox.jsx';
import Filters from '../components/Filters.jsx';
import TVList from '../components/TVList.jsx';
import WatchlistPanel from '../components/WatchlistPanel.jsx';

const Home = () => {
  const { state, dispatch } = useAppContext();
  const { query } = state;

  useEffect(() => {
    const fetchShows = async () => {
      dispatch({ type: 'FETCH_INIT' }); 
      try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    if (query) {
      fetchShows();
    } else {
       dispatch({ type: 'FETCH_SUCCESS', payload: [] });
    }
  }, [query, dispatch]); 

  return (
    // Tüm inline stiller kaldırıldı, className'ler eklendi
    <div className="home-page">

      <header className="home-header">
        <h1>Kampüs Film Kulübü</h1>
        <div className="controls-container">
          <SearchBox /> 
          <Filters /> 
        </div>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <TVList /> 
        </div>

        <div className="right-panel">
          <WatchlistPanel /> 
        </div>
      </div>
    </div>
  );
};

export default Home;
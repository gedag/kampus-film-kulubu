import React, { useMemo } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext.jsx';
import TVCard from './TVCard.jsx';
import Pagination from './Pagination.jsx'; 

// Koşullu render bileşenleri artık CSS sınıflarını kullanıyor
const LoadingSpinner = () => <div className="list-status-message">Yükleniyor...</div>;
const EmptyResults = () => <div className="list-status-message">Sonuç bulunamadı. Lütfen aramanızı veya filtrelerinizi değiştirin.</div>;
const ErrorMessage = ({ onRetry }) => (
  <div className="list-error-message">
    <p>Veri yüklenirken bir hata oluştu.</p>
    <button onClick={onRetry}>Tekrar Dene</button>
  </div>
);

const TVList = () => {
  const { state, dispatch } = useAppContext();
  const { isLoading, isError, shows, filters, pagination } = state;

  const filteredShows = useMemo(() => {
    return shows.filter(item => {
      const show = item.show;
      const matchLang = !filters.language || 
        (show.language && show.language.toLowerCase().includes(filters.language.toLowerCase()));
      const matchGenre = !filters.genre || 
        (show.genres && show.genres.some(g => g.toLowerCase().includes(filters.genre.toLowerCase())));
      const matchRating = !filters.minRating || 
        (show.rating && show.rating.average >= parseFloat(filters.minRating));
      return matchLang && matchGenre && matchRating;
    });
  }, [shows, filters]);

  const { currentPage, pageSize } = pagination; 
  const totalPages = Math.ceil(filteredShows.length / pageSize);
  const paginatedShows = filteredShows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const retryFetch = () => {
    dispatch({ type: 'FETCH_INIT' }); 
    axios.get(`https://api.tvmaze.com/search/shows?q=${state.query}`)
      .then(response => dispatch({ type: 'FETCH_SUCCESS', payload: response.data }))
      .catch(() => dispatch({ type: 'FETCH_FAILURE' }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorMessage onRetry={retryFetch} />;
  }

  if (paginatedShows.length === 0) {
    if (shows.length === 0 || filteredShows.length === 0) {
      return <EmptyResults />;
    }
  }

  return (
    <>
      {/* style kaldırıldı, className eklendi */}
      <div className="tv-list-grid">
        {paginatedShows.map(item => (
          <TVCard key={item.show.id} show={item.show} /> 
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} /> 
    </>
  );
};

export default TVList;
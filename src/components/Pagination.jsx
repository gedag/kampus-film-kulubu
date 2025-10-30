import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const Pagination = ({ currentPage, totalPages }) => {
  const { dispatch } = useAppContext();

  const setPage = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination">
      <button 
        onClick={() => setPage(1)} 
        disabled={currentPage === 1}
      >
        İlk
      </button>
      <button 
        onClick={() => setPage(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Geri
      </button>

      <span>
        Sayfa {currentPage} / {totalPages}
      </span>

      <button 
        onClick={() => setPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        İleri
      </button>
      <button 
        onClick={() => setPage(totalPages)} 
        disabled={currentPage === totalPages}
      >
        Son
      </button>
    </nav>
  );
};

export default Pagination;
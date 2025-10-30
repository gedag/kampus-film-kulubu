import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { Link } from 'react-router-dom';

const WatchlistPanel = () => {
  const { state, dispatch } = useAppContext();
  const { watchlist } = state;

  return (
    <aside className="watchlist-panel">
      <h3>Gösterime Girecekler</h3>

      {watchlist.length === 0 ? (
        <p>Listeniz boş. Kartlardan "Kısa Listeye Ekle" butonuna basarak dizi ekleyebilirsiniz.</p>
      ) : (
        <ul className="watchlist-list">
          {watchlist.map(item => (
            <li key={item.show.id} className="watchlist-item">
              <Link to={`/show/${item.show.id}`}>
                {item.show.name}
              </Link>

              <button 
                className="remove-btn"
                onClick={() => dispatch({ type: 'REMOVE_WATCHLIST', payload: item.show.id })}
              >
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      )}

      {watchlist.length > 0 && (
        <button 
          className="clear-watchlist-btn"
          onClick={() => dispatch({ type: 'CLEAR_WATCHLIST' })}
        >
          Tümünü Temizle
        </button>
      )}
    </aside>
  );
};

export default WatchlistPanel;
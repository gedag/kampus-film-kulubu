import React from 'react';
import { Link } from 'react-router-dom'; // 'Detay' butonu için
import { useAppContext } from '../context/AppContext.jsx';
import './TVCard.css'; // CSS dosyamızı import ediyoruz

const TVCard = ({ show }) => {
  const { dispatch } = useAppContext();

  // "Kısa Listeye Ekle" butonunun fonksiyonu [cite: 33]
  const handleAddToList = () => {
    // Reducer'a ADD_WATCHLIST eylemini gönderiyoruz [cite: 35]
    dispatch({ type: 'ADD_WATCHLIST', payload: { show } }); 
  };

  // TVMaze API'sinden gelen veride 'summary' HTML içerir,
  // bunu güvenli bir şekilde göstermek yerine kısa bir text oluşturalım
  const getShortSummary = (summary) => {
    if (!summary) return "Özet bulunamadı.";
    const cleanSummary = summary.replace(/<[^>]+>/g, ''); // HTML taglarını temizle
    return cleanSummary.length > 100 
      ? cleanSummary.substring(0, 100) + '...' 
      : cleanSummary;
  };

  return (
    <div className="tv-card">
      {/* 1. Poster [cite: 32] */}
      <img 
        src={show.image ? show.image.medium : 'https://via.placeholder.com/210x295.png?text=Poster+Yok'} 
        alt={show.name} 
      />

      <div className="tv-card-content">
        {/* 2. Ad [cite: 32] */}
        <h4>{show.name}</h4>

        {/* 3. Tür, Dil, Puan [cite: 32] */}
        <p><strong>Tür:</strong> {show.genres?.join(', ') || 'Bilinmiyor'}</p>
        <p><strong>Dil:</strong> {show.language || 'Bilinmiyor'}</p>
        <p><strong>Puan:</strong> {show.rating?.average || 'N/A'}</p>

        {/* 4. Kısa Özet [cite: 32] */}
        <p>{getShortSummary(show.summary)}</p>

        {/* 5. Butonlar [cite: 33] */}
        <div className="card-buttons">
          {/* 'Detay' butonu /show/:id sayfasına yönlendirir */}
          <Link to={`/show/${show.id}`}>
            <button>Detay</button>
          </Link>

          <button onClick={handleAddToList} className="add-btn">
            Kısa Listeye Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;
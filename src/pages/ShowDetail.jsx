import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Bu sayfada artık inline stil (style objeleri) kullanmıyoruz.
// Tüm stiller App.css'ten (veya index.css'ten) gelecek.

const ShowDetail = () => {
  const { id } = useParams(); 
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const showPromise = axios.get(`https://api.tvmaze.com/shows/${id}`);
        const episodesPromise = axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);

        const [showResponse, episodesResponse] = await Promise.all([
          showPromise,
          episodesPromise,
        ]);

        setShow(showResponse.data);
        setEpisodes(episodesResponse.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); 

  if (loading) {
    // 'list-status-message' sınıfını TVList'ten yeniden kullanıyoruz
    return <div className="list-status-message">Yükleniyor...</div>;
  }

  if (error) {
    // 'list-error-message' sınıfını TVList'ten yeniden kullanıyoruz
    return <div className="list-error-message">Detaylar yüklenirken bir hata oluştu.</div>;
  }

  if (!show) {
    return <div className="list-status-message">Dizi bilgisi bulunamadı.</div>;
  }

  return (
    // style etiketi kaldırıldı
    <div className="show-detail">

      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        &larr; Anasayfaya Dön
      </Link>

      {/* className'ler App.css'ten geliyor */}
      <header className="show-detail-header">
        <img 
          className="show-detail-img"
          src={show.image ? show.image.original : 'https://via.placeholder.com/300x420.png?text=Poster+Yok'} 
          alt={show.name} 
        />
        <div className="show-detail-info">
          <h1>{show.name}</h1>
          <p><strong>Tür:</strong> {show.genres?.join(', ')}</p>
          <p><strong>Dil:</strong> {show.language}</p>
          <p><strong>Puan:</strong> {show.rating?.average || 'N/A'}</p>
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </header>

      <section className="episodes">
        <h2>Bölümler</h2>
        <ul className="episodes-list">
          {episodes.length > 0 ? episodes.map(ep => (
            <li key={ep.id} className="episode-item">
              <strong>S{String(ep.season).padStart(2, '0')}B{String(ep.number).padStart(2, '0')}:</strong> {ep.name}
              {/* Bölüm özeti için (opsiyonel) */}
              {/* <p>{ep.summary ? ep.summary.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : ''}</p> */}
            </li>
          )) : (
            <p>Bölüm listesi bulunamadı.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ShowDetail;
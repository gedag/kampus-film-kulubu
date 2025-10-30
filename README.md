# Kampüs Film Kulübü (SDÜ Film Kulübü Projesi)

Bu proje, Süleyman Demirel Üniversitesi Film Kulübü için geliştirilmiş, TVMaze API'sini kullanarak dizi arama, filtreleme ve gösterim listesi oluşturma uygulamasıdır.

Proje, React temelleri ödevinde belirtilen tüm gereksinimleri karşılamak üzere oluşturulmuştur.

**Canlı Demo Linki (Vercel):**
[https://kampus-film-kulubu-atps.vercel.app](https://kampus-film-kulubu-atps.vercel.app)

---

## 1. Kullanılan React Kavramları ve Özellikler

* **`Axios`**: Tüm API (TVMaze) istekleri `axios` kullanılarak yapılmıştır.
* **`useEffect`**: Anasayfada (`Home`) varsayılan veri çekme ve detay sayfasında (`ShowDetail`) veri çekme işlemleri için kullanılmıştır.
* **`useReducer`**: Tüm global state (sorgu, filtreler, watchlist, sayfalama) `useReducer` ve `Context API` aracılığıyla yönetilmiştir.
* **`Composition` (Bileşen Yapısı)**: Proje, dokümanda istenen tüm bileşenlere ayrılmıştır:
    * `Home` (Anasayfa)
    * `ShowDetail` (Detay Sayfası)
    * `SearchBox` (Arama)
    * `Filters` (Filtreleme)
    * `TVList` & `TVCard` (Listeleme ve Kart)
    * `WatchlistPanel` (Gösterim Listesi)
    * `Pagination` (Sayfalama)
    * `Footer` (Geliştirici bilgisi)
* **`Conditional Rendering`**: `TVList` bileşeni içinde "Yükleniyor", "Hata Oluştu" ve "Sonuç Bulunamadı" durumları ele alınmıştır.
* **`Pagination`**: Uzun listeler her sayfada 6 dizi olacak şekilde sayfalanmış ve "İlk, Geri, İleri, Son" navigasyonu eklenmiştir.

---

## 2. Uygulama Akışı ve Şartlar

Proje, ödevdeki tüm akış şartlarını sağlamaktadır:

1.  **Varsayılan Arama:** Uygulama açıldığında varsayılan olarak "friends" sorgusuyla başlar.
2.  **Filtreler:** Kullanıcı "Tür, Dil, Min Puan" kriterlerine göre istemci tarafında filtreleme yapabilir.
3.  **Gösterim Listesi:** Kullanıcı "Kısa Listeye Ekle" butonuyla sağ paneldeki listeye (`WatchlistPanel`) dizi ekleyebilir. Bu liste `useReducer` (`ADD_WATCHLIST`, `REMOVE_WATCHLIST`) ile yönetilir.
4.  **Detay Sayfası (Kritik Şart):** "Detay" butonuna basıldığında, `ShowDetail` sayfası açılır. Bu sayfa, `Promise.all` kullanarak **iki ayrı API isteği** atar:
    * Dizi detayları (`.../shows/:id`)
    * Bölüm listesi (`.../shows/:id/episodes`)

---

## 3. Kullanılan API Endpointleri (TVMaze)

* **Arama:** `https://api.tvkyiaze.com/search/shows?q=<query>`
* **Detay:** `https://api.tvmaze.com/shows/:id`
* **Bölümler:** `https://api.tvmaze.com/shows/:id/episodes`

# Kampüs Film Kulübü (SDÜ Film Kulübü Projesi)

Bu proje, Süleyman Demirel Üniversitesi Film Kulübü için geliştirilmiş, TVMaze API'sini kullanarak dizi arama, filtreleme ve gösterim listesi oluşturma uygulamasıdır.

[cite_start]Proje, React temelleri ödevinde [cite: 1-46] belirtilen tüm gereksinimleri karşılamak üzere oluşturulmuştur.

**Canlı Demo Linki (Vercel):**
`[Vercel'den alınacak link buraya eklenecek]` 

---

## 1. Kullanılan React Kavramları ve Özellikler

* **`Axios`**: Tüm API (TVMaze) istekleri `axios` kullanılarak yapılmıştır.
* **`useEffect`**: Anasayfada (`Home`) varsayılan veri çekme ve detay sayfasında (`ShowDetail`) veri çekme işlemleri için kullanılmıştır.
* **`useReducer`**: Tüm global state (sorgu, filtreler, watchlist, sayfalama) `useReducer` ve `Context API` aracılığıyla yönetilmiştir.
* [cite_start]**`Composition` (Bileşen Yapısı)** [cite: 10-19]: Proje, dokümanda istenen tüm bileşenlere ayrılmıştır.
* **`Conditional Rendering`**: `TVList` bileşeni içinde "Yükleniyor", "Hata Oluştu" ve "Sonuç Bulunamadı" durumları ele alınmıştır.
* [cite_start]**`Pagination`** [cite: 21, 36-39]: Uzun listeler her sayfada 6 dizi olacak şekilde sayfalanmıştır.

---

## 2. Uygulama Akışı ve Şartlar

[cite_start]Proje, ödevdeki [cite: 29-46] tüm akış şartlarını sağlamaktadır:

1.  **Varsayılan Arama:** Uygulama açıldığında varsayılan olarak "friends" sorgusuyla başlar.
2.  **Detay Sayfası (Kritik Şart):** `ShowDetail` sayfası, `Promise.all` kullanarak **iki ayrı API isteği** atar:
    * Dizi detayları (`.../shows/:id`)
    * [cite_start]Bölüm listesi (`.../shows/:id/episodes`) [cite: 28, 41-42]
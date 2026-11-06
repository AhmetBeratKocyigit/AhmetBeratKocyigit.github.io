
## Veri yapıları

| Yapı | Ana fikir | Kullanım sezgisi |
|---|---|---|
| Dizi | Sıralı, indeksli öğeler | İndeksli erişim |
| Bağlı liste | Bağlantılı düğümler | Düğümler üzerinden gezinme |
| Yığın | LIFO | Geri alma, çağrı yığını |
| Kuyruk | FIFO | İş/görev sırası |
| Ağaç | Hiyerarşik düğümler | Dizin ve hiyerarşi |
| Graf | Düğüm ve kenarlar | Ağ, yol, ilişki |
| Durum makinesi | Durum ve geçişler | Protokol ve iş akışı |
| İlişkisel model | Tablolar ve anahtarlar | İlişkili kayıtlar |

Veri yapısı; erişim, ekleme, silme ve bellek maliyetini etkiler. Soyut liste ile dizide veya bağlı düğümlerde gerçeklenmiş liste aynı şey değildir.

## Algoritma analizi

- Algoritma, problemi çözen sonlu ve açık adımlardır.
- `T(n)`, girdi boyutu büyürken temel işlem sayısına ilişkin modeldir; kesin saniye değildir.
- En iyi, ortalama ve en kötü durum farklı girdi koşullarını ifade eder.
- `O` üst, `Ω` alt, `Θ` sıkı asimptotik sınırdır.
- Sabitler ve düşük dereceli terimler baskın olmayan büyümede atılır: `3n²+5n+1 = Θ(n²)`.

| Desen | Büyüme |
|---|---|
| Sabit sayıda işlem | `Θ(1)` |
| n kez döngü | `Θ(n)` |
| Her turda ikiye katlama | `Θ(log n)` |
| İki n döngüsü iç içe | `Θ(n²)` |
| Üç n döngüsü iç içe | `Θ(n³)` |

## Arama örnekleri

- Doğrusal arama: herhangi bir diziyi tarar; en iyi `Θ(1)`, en kötü `Θ(n)`.
- İkili arama: yalnızca sıralı veride uygundur; her adımda alanı yarıya indirir ve `O(log n)` çalışır.
- Dizi toplamı `Θ(n)`; standart `n×n` matris çarpımı `Θ(n³)` büyür.

### Hızlı tekrar

1. 64 öğelik sıralı dizide ikili arama en fazla yaklaşık kaç yarılama adımı yapar?
2. Kuyruk ile yığının çıkarma sırasındaki farkı nedir?
3. `n² + 2ⁿ` ifadesinde büyük n için hangi terim baskındır?
4. Big-O ifadesi neden her zaman “en kötü durum” anlamına gelmez?



> **Konu Kapsamı:** Veri modelleri, temel ve tanımlamalı veri yapıları, C/C++ bellek yapılanmaları, algoritma tasarımı, yürütme zamanı analizi ($T(n)$ hesaplaması), asimptotik notasyonlar ($O, \Omega, \Theta$) ve matematiksel ispatlar.

---

## İçindekiler

1. [Veri, Bilgi ve Veri Modeli Kavramları](#1-veri-bilgi-ve-veri-modeli-kavramları)
2. [Temel ve Tanımlamalı Veri Yapıları (C/C++ Bellek Yapısı)](#2-temel-ve-tanımlamalı-veri-yapıları-cc-bellek-yapısı)
3. [Yaygın Veri Modelleri ve Karşılaştırmalı Özellikleri](#3-yaygın-veri-modelleri-ve-karşılaştırmalı-özellikleri)
4. [Algoritma Tasarımı ve Kaba-Kod (Pseudo Code)](#4-algoritma-tasarımı-ve-kaba-kod-pseudo-code)
5. [Yürütme Zamanı Analizi $T(n)$ ve Adım Sayımı](#5-yürütme-zamanı-analizi-tn-ve-adım-sayımı)
6. [Asimptotik Analiz: Big-$O$, Big-$\Omega$ ve Big-$\Theta$ Notasyonları](#6-asimptotik-analiz-big-o-big-omega-ve-big-theta-notasyonları)
7. [Asimptotik Notasyon İspatları ($c$ ve $n_0$ Hesabı)](#7-asimptotik-notasyon-ispatları-c-ve-n_0-hesabı)
8. [Matematiksel Seriler ve Analiz Formülleri](#8-matematiksel-seriler-ve-analiz-formülleri)
9. [Döngülerin ve Yapıların Analiz Kuralları](#9-döngülerin-ve-yapıların-analiz-kuralları)
10. [Arama ve Hesaplama Algoritmalarının Analizi](#10-arama-ve-hesaplama-algoritmalarının-analizi)
11. [Algoritma Seçim Kriterleri ve Sınava Hazırlık Çalışma Soruları](#11-algoritma-seçim-kriterleri-ve-sınava-hazırlık-çalışma-soruları)

---

## 1. Veri, Bilgi ve Veri Modeli Kavramları

* **Veri (Data):** Algoritmalar tarafından işlenen en temel elemanlardır (sayısal ve metinsel değerler, resim, ses, girdi ve çıktılar). Ham değerleri temsil eder (Örn: `18`).
* **Bilgi (Information):** Verilerin bir bağlam içerisinde anlamlandırılmış ve yorumlanmış halidir (Örn: *"Bir öğrencinin haftalık çalışma saati: 18"*).
* **Veri Yapısı (Data Structure):** Verinin bellekte tutulma şeklini, düzenini ve bu veriler üzerinde hangi işlemlerin (arama, ekleme, silme) nasıl yapılacağını tanımlar.
* **Veri Modeli (Data Model):** Verilerin birbirleriyle olan ilişkisel veya sırasal durumunu gösteren kavramsal bir yaklaşım yöntemidir.

### Veri Yapılarına Neden İhtiyaç Duyulur?
* Yazılımların karmaşıklığı gün geçtikçe artmaktadır (Örn: Google'ın 8 milyar sayfayı indekslemesi).
* Temiz kavramsal yapılar ve doğru veri modelleri:
  1. Hızlı çalışan algoritmalar ve verimli kaynak kullanımı,
  2. Kolay bakım, güvenilirlik ve yüksek başarım sağlar.

---

## 2. Temel ve Tanımlamalı Veri Yapıları (C/C++ Bellek Yapısı)

Veri yapıları programlama dili seviyesinde iki ana gruba ayrılır:

### A. Temel Veri Yapıları
Programlama dillerinin doğrudan değişken/sabit bildirimiyle sunduğu veri tipleridir:
* **Karakter (Character):** `char` (`'A'`, `'B'`, `'?'`) — 8 bit
* **Tamsayı (Integer):** `int` (`1923`, `29`, `-15`) — 16/32 bit
* **Gerçel Sayı (Real Number):** `float`, `double` (`3.14`, `$1.53 \times 10^8$`) — 32/64 bit
* **Katar (String):** Karakter dizileri (`"Üniversite"`)
* **Dizi / Matris (Array):** Bellekte ardışıl yer kaplayan aynı türdeki veri elemanları.

### B. Tanımlamalı (Bileşik) Veri Yapıları
Temel veya önceden tanımlanmış veri yapıları kullanılarak yeni veri tipleri oluşturulmasıdır. C programlama dilinde 3 farklı şekilde yapılır:

1. **Topluluk (`struct`) Oluşturma:** Birden fazla farklı türdeki veri yapısının bir araya getirilerek paketlenmesidir (Java/C#'taki `class` mantığı).

   ```c
   struct kimlik {
       char ad[15];
       char soyad[20];
       int yas;
       char adres[50];
   };
   struct kimlik kisi1;
   ```

2. **Ortaklık (`union`) Oluşturma:** Birden fazla değişkenin **aynı bellek alanını** paylaşmasını sağlayan yapıdır. Belirtilen elemanlardan bellekte en fazla yer kaplayanın boyutu kadar alan tahsis edilir:

   ```c
   union paylas {
       int i;     /* 16/32 bit */
       float f;   /* 32 bit */
       char kr;   /* 8 bit */
   };
   ```
   > *Bu ortaklık yapısı toplam $32 \text{ bit} = 4 \text{ bayt}$ alan kaplar. Tüm değişkenler bu alanı ortak kullanır.*

3. **Bit Düzeyinde Erişim:** Verinin her bir bit'i üzerinde diğerlerinden bağımsız olarak işlem yapılabilmesini sağlar. Maskeleme ve bayrak (flag) işlemlerinde kullanılır.

---

## 3. Yaygın Veri Modelleri ve Karşılaştırmalı Özellikleri

| Veri Modeli | Bellek Yerleşimi / İlkesi | Avantajları (Artıları) | Dezavantajları (Eksileri) |
| :--- | :--- | :--- | :--- |
| **Dizi (Array)** | Ardışıl bellek blokları | İndeks biliniyorsa çok hızlı erişim $O(1)$ | Sabit boyutlu, yavaş arama $O(n)$, yavaş ekleme/silme |
| **Sıralı Dizi** | Sıralanmış ardışıl bellek | İkili arama ile hızlı arama $O(\log n)$ | Yavaş ekleme ve silme $O(n)$, sabit boyut |
| **Bağlantılı Liste (Linked List)** | Düğüm (veri + adres) yapısı | Dinamik boyut, hızlı ekleme/silme $O(1)$ | Yavaş ve ardışıl arama $O(n)$, pointer bellek maliyeti |
| **Yığın (Stack)** | LIFO (Son Giren İlk Çıkar) | Son elemana erişim ve işlem çok hızlı $O(1)$ | Aradaki/alttaki elemanlara erişim yavaş $O(n)$ |
| **Kuyruk (Queue)** | FIFO (İlk Giren İlk Çıkar) | Düzenli sıra yönetimi, ilk elemana hızlı erişim $O(1)$ | Aradaki elemanlara erişim yavaş $O(n)$ |
| **İkili Ağaç (Binary Tree)** | Hiyerarşik düğüm ilişkisi | Dengeli ağaçta hızlı arama, ekleme ve silme $O(\log n)$ | Denge bozulursa $O(n)$ olur, silme algoritması karmaşıktır |
| **Graf (Graph)** | Düğümler (Köşe) ve Kenarlar | Gerçek dünya ilişkilerini ve ağları kusursuz modeller | Algoritma karmaşıklığı yüksek, bazı işlemler yavaş |
| **Hash Tablosu** | Anahtar-Değer (Key-Value) | Anahtar bilindiğinde süper hızlı erişim $O(1)$ | Çakışmalar (collision), yavaş silme, anahtarsız erişim zor |
| **Durum Makinesi** | Durumlar ve olay bazlı geçişler | Karmaşık sistem davranışlarını ve gramer çözümünü doğrular | Yalnızca durum tabanlı problemlere uygundur |
| **İlişkisel Veritabanı** | Tablolar, Anahtarlar (PK/FK) | Düzenli saklama, güçlü SQL sorgulama imkanı | Bellek ve disk I/O maliyeti yüksek |

---

## 4. Algoritma Tasarımı ve Kaba-Kod (Pseudo Code)

**Algoritma;** bir problemin çözümünde adım adım izlenecek, sonlu, açık, kesin ve uygulanabilir adımlar dizisidir. Programlama diliyle ifade edildiğinde **program** adını alır.

### Kaba-Kod Gösterim Kuralları

```pseudocode
// 1. Atama Operatörü
değişken := değer

// 2. Fonksiyon Tanımı
AlgoritmaAdi(Parametre Listesi)

// 3. Karar ve Döngü Yapıları
if koşul then
    // işlemler
else
    // alternatif işlemler
endif

for i := 1 to n do
    // tekrarlanacak işler
endfor

while koşul do
    // tekrarlanacak işler
endwhile

// 4. Değer Döndürme
return sonuç
```

---

## 5. Yürütme Zamanı Analizi $T(n)$ ve Adım Sayımı

Bir programın çalışma zamanı $T(n)$, temel kabul edilen işlemlerin (atama, karşılaştırma, toplama) toplam çalıştırılma frekansının hesaplanmasıyla elde edilir.

### Örnek 1: Aritmetik Ortalama Hesabı ($T(n)$ Analizi)

```c
float bulOrta(float A[], int n) {
    float ortalama, toplam = 0;   /* Line 1 */
    int k;                        /* Line 1 */
    for (k = 0; k < n; k++)       /* Line 2 */
        toplam += A[k];           /* Line 3 */
    ortalama = toplam / n;        /* Line 4 */
    return ortalama;              /* Line 5 */
}
```

#### Adım Adım Frekans Tablosu:

| C Dili Deyimi | Birim Zaman | Frekans (Tekrar Sayısı) | Toplam İşlem |
| :--- | :---: | :---: | :---: |
| `toplam = 0; int k;` | 1 | 1 | 1 |
| `for(k=0; k<n; k++)` | 1 | $n + 1$ (Son kontrol dahil) | $n + 1$ |
| `toplam += A[k];` | 1 | $n$ | $n$ |
| `ortalama = toplam / n;` | 1 | 1 | 1 |
| `return ortalama;` | 1 | 1 | 1 |
| **TOPLAM** $T(n)$ | — | — | **$T(n) = 3n + 4$** |

---

### Örnek 2: En Küçük Elemanı Bulma ($T(n)$ Analizi)

```c
float bulEnKucuk(float A[], int n) {
    float enkucuk;
    int k;
    enkucuk = A[0];               /* Line 1 */
    for (k = 1; k < n; k++)       /* Line 2 */
        if (A[k] < enkucuk)       /* Line 3 */
            enkucuk = A[k];       /* Line 4 */
    return enkucuk;               /* Line 5 */
}
```

#### Adım Adım Frekans Tablosu:

| C Dili Deyimi | Birim Zaman | Frekans (Tekrar Sayısı) | Toplam İşlem |
| :--- | :---: | :---: | :---: |
| `enkucuk = A[0];` | 1 | 1 | 1 |
| `for(k=1; k<n; k++)` | 1 | $n$ | $n$ |
| `if(A[k] < enkucuk)` | 1 | $n - 1$ | $n - 1$ |
| `enkucuk = A[k];` (En Kötü Durum) | 1 | $n - 1$ | $n - 1$ |
| `return enkucuk;` | 1 | 1 | 1 |
| **TOPLAM** $T(n)$ | — | — | **$T(n) = 4n - 1 \approx 4n$** |

---

### Örnek 3: Matris Toplama ($T(n, m)$ Analizi)

```c
void toplaMatris(int n, int m, int A[n][m], int B[n][m], int C[n][m]) {
    int i, j;
    for (i = 0; i < n; i++) {              /* Dış Döngü */
        for (j = 0; j < m; j++) {          /* İç Döngü */
            C[i][j] = A[i][j] + B[i][j];   /* Matris Toplama */
        }
    }
}
```

#### Adım Adım Frekans Tablosu:

| C Dili Deyimi | Birim Zaman | Frekans (Tekrar Sayısı) | Toplam İşlem |
| :--- | :---: | :---: | :---: |
| `for(i=0; i<n; i++)` | 1 | $n + 1$ | $n + 1$ |
| `for(j=0; j<m; j++)` | 1 | $n \times (m + 1)$ | $n \cdot m + n$ |
| `C[i][j] = A[i][j] + B[i][j]` | 1 | $n \times m$ | $n \cdot m$ |
| **TOPLAM** $T(n,m)$ | — | — | **$T(n,m) = 3nm + 2n + 1 \approx 3nm + 4n + 2$** |

> **Kare Matris Durumunda ($n = m$):**
> $$T(n) = 3n^2 + 4n + 2 \implies \Theta(n^2)$$

---

## 6. Asimptotik Analiz: Big-$O$, Big-$\Omega$ ve Big-$\Theta$ Notasyonları

Asimptotik analiz, $n \rightarrow \infty$ (eleman sayısı sonsuza giderken) algoritmanın çalışma maliyetinin büyüme oranını inceler. Sabit katsayılar ve düşük dereceli terimler ihmal edilir.

> ### Çalışma Zamanı Sınırlandırma İlişkisi
>
> **$c_2 \cdot f(n)$** $\rightarrow$ **Big-$O$ (Üst Sınır / Upper Bound):** En kötü durum senaryosu.  
> **$T(n)$** $\rightarrow$ **Gerçek Çalışma Zamanı (Actual Running Time)**  
> **$c_1 \cdot f(n)$** $\rightarrow$ **Big-$\Omega$ (Alt Sınır / Lower Bound):** En iyi durum senaryosu.  
> **Big-$\Theta$ (Kesin Sınır):** $T(n)$ fonksiyonu hem alttan hem üstten aynı $f(n)$ fonksiyonu ile sıkıştırılıyorsa geçerlidir.  
>
> *(Sınırlandırma $n \ge n_0$ kritik eşik noktasından itibaren geçerli olur).*

---

### 1. Big-$O$ Notasyonu (Asimptotik Üst Sınır - En Kötü Durum)
$T(n)$ fonksiyonunun büyüme hızının üst sınırını belirler.

$$\exists c > 0, n_0 > 0 \quad \text{öyle ki} \quad \forall n \ge n_0 \implies T(n) \le c \cdot f(n)$$

*Gösterim:* $T(n) = O(f(n))$

---

### 2. Big-$\Omega$ (Omega) Notasyonu (Asimptotik Alt Sınır - En İyi Durum)
$T(n)$ fonksiyonunun büyüme hızının alt sınırını belirler.

$$\exists c > 0, n_0 > 0 \quad \text{öyle ki} \quad \forall n \ge n_0 \implies T(n) \ge c \cdot f(n)$$

*Gösterim:* $T(n) = \Omega(f(n))$

---

### 3. Big-$\Theta$ (Theta) Notasyonu (Kesin Sınır - Ortalama Durum)
$T(n)$ fonksiyonunu hem alttan hem üstten aynı büyüme sınıfı ile sıkıştırır.

$$\exists c_1, c_2 > 0, n_0 > 0 \quad \text{öyle ki} \quad \forall n \ge n_0 \implies c_1 \cdot f(n) \le T(n) \le c_2 \cdot f(n)$$

*Gösterim:* $T(n) = \Theta(f(n))$

---

### Karmaşıklık Sınıflarının Kıyaslama Hiyerarşisi

Veri boyutu $n$ büyüdükçe maliyet artış sıralaması:

$$O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(n^3) < O(2^n) < O(10^n) < O(n!)$$

| Notasyon | Türü | Tanımı ve Örneği |
| :--- | :--- | :--- |
| $O(1)$ | Sabit (Constant) | Dizi indeksinden eleman okuma |
| $O(\log n)$ | Logaritmik | İkili arama (Binary Search) |
| $O(n)$ | Doğrusal (Linear) | Tekli döngü, diziyi baştan sona tarama |
| $O(n \log n)$ | Doğrusal Logaritmik | Verimli sıralama algoritmaları (Quick Sort, Merge Sort) |
| $O(n^2)$ | Karesel (Quadratic) | İç içe iki döngü (Bubble Sort, Selection Sort) |
| $O(n^3)$ | Kübik (Cubic) | İki matrisin standart çarpımı (3 iç içe döngü) |
| $O(2^n)$ | Üssel (Exponential) | Tüm alt kümeleri arama (Brute-force) |
| $O(n!)$ | Faktöriyel | Gezgin Satıcı Problemi (TSP brute-force) |

---

## 7. Asimptotik Notasyon İspatları ($c$ ve $n_0$ Hesabı)

Sınavlarda sıklıkla sorulan matematiksel ispat örnekleri:

### İspat 1: $1000N = O(N)$ İspatı
* **Tanım:** $1000N \le c \cdot N \quad (\forall N \ge n_0)$
* **Çözüm:** İki tarafı $N$'e bölersek $1000 \le c$ elde edilir.
* **Seçim:** $c = 1000$ (veya $2000$) ve $n_0 = 1$ seçilirse eşitsizlik sağlanır.
* **Sonuç:** İfade **DOĞRUDUR**.

---

### İspat 2: $7n^2 + 5 = O(n^2)$ İspatı
* **Tanım:** $7n^2 + 5 \le c \cdot n^2 \quad (\forall n \ge n_0)$
* **Çözüm:** İki tarafı $n^2$'ye bölersek: $7 + \frac{5}{n^2} \le c$
* $n \ge 1$ için $\frac{5}{n^2} \le 5$ olacağından $7 + 5 = 12$ olur.
* **Seçim:** $c = 12$ ve $n_0 = 1$ (veya $c = 8, n_0 = 5$) seçilirse eşitsizlik her $n \ge n_0$ için geçerlidir.
* **Sonuç:** İfade **DOĞRUDUR**.

---

### İspat 3: $7n^2 + 5 = O(n)$ İfadesinin Yanlışlığının İspatı
* **Tanım:** $7n^2 + 5 \le c \cdot n \quad (\forall n \ge n_0)$
* **Çözüm:** İki tarafı $n$'e bölersek: $7n + \frac{5}{n} \le c$
* Sol taraf $n$ büyüdükçe sonsuza gider ($\infty$). Sabit bir $c$ sayısı ile sınırlandırılamaz.
* **Sonuç:** Eşitsizliği sağlayan sabit bir $(c, n_0)$ çifti **YOKTUR**. İfade **YANLIŞTIR**.

---

### İspat 4: $\frac{1}{2}n^2 - 3n = \Theta(n^2)$ İspatı
* **Tanım:** $c_1 \cdot n^2 \le \frac{1}{2}n^2 - 3n \le c_2 \cdot n^2 \quad (\forall n \ge n_0)$
* İki tarafı $n^2$'ye bölelim:
  $$c_1 \le \frac{1}{2} - \frac{3}{n} \le c_2$$
* **Üst Sınır ($c_2$):** $n \ge 1$ için $\frac{1}{2} - \frac{3}{n} < \frac{1}{2} \implies c_2 = \frac{1}{2}$
* **Alt Sınır ($c_1$):** $n \ge 7$ seçilirse $\frac{3}{7} \approx 0.428 \implies \frac{1}{2} - \frac{3}{7} = \frac{1}{14}$
* **Seçim:** $c_1 = \frac{1}{14}, c_2 = \frac{1}{2}, n_0 = 7$ olarak tanımlanabilir.
* **Sonuç:** İfade **DOĞRUDUR**.

---

## 8. Matematiksel Seriler ve Analiz Formülleri

Algoritma döngü adımlarını toplarken kullanacağımız temel matematiksel seriler:

1. **Aritmetik Seri Toplamı:**
   $$\sum_{i=1}^{N} i = 1 + 2 + 3 + \dots + N = \frac{N(N+1)}{2} = \Theta(N^2)$$

2. **Kareler Toplamı:**
   $$\sum_{i=1}^{N} i^2 = 1^2 + 2^2 + 3^2 + \dots + N^2 = \frac{N(N+1)(2N+1)}{6} \approx \frac{N^3}{3} = \Theta(N^3)$$

3. **Geometrik Seri:**
   $$\sum_{i=0}^{N} A^i = \frac{A^{N+1} - 1}{A - 1} \quad (A > 1 \text{ ise } \Theta(A^N))$$
   $$\sum_{i=0}^{N} A^i = \frac{1 - A^{N+1}}{1 - A} = \Theta(1) \quad (A < 1 \text{ ise})$$

4. **Harmonik Seri:**
   $$H_n = \sum_{i=1}^{n} \frac{1}{i} = 1 + \frac{1}{2} + \frac{1}{3} + \dots + \frac{1}{n} = \ln n + O(1) = \Theta(\log n)$$

5. **Logaritma Kuralları:**
   * $\log(A \cdot B) = \log A + \log B$
   * $\log\left(\frac{A}{B}\right) = \log A - \log B$
   * $\log(A^B) = B \cdot \log A$

---

## 9. Döngülerin ve Yapıların Analiz Kuralları

### Kural 1: Tekli For Döngüsü
Bir `for` döngüsünün çalışma zamanı, döngü içindeki komutların çalışma zamanı ile gövdenin çalışma sayısının çarpımına eşittir.

### Kural 2: İç İçe Döngüler (Nested Loops)
İç içe döngülerde analiz **içten dışa** doğru yapılır. Toplam çalışma zamanı, döngü boyutlarının çarpımı kadardır.

```c
for (i = 1; i <= N; i++) {
    for (j = 1; j <= N * N; j++) {
        k = k + 1; /* O(1) */
    }
}
```
* **İç döngü:** $N^2$ kez döner.
* **Dış döngü:** $N$ kez döner.
* **Toplam Maliyet:** $N \times N^2 = O(N^3)$.

---

### Kural 3: Ardışık Deyimler (Sequential Statements)
Arka arkaya gelen bağımsız döngü ve kod bloklarının maliyeti toplanır. En yüksek büyüme derecesine sahip olan terim (baskın terim) karmaşıklığı belirler.

```c
/* Blok 1 */
k = 0;                          /* O(1) */

/* Blok 2 */
for (j = 1; j <= N * N; j++) {  /* O(N^2) */
    k = k + 1;
}

/* Blok 3 */
for (l = 1; l <= sqrt(k); l++) { /* O(N) */
    t = 5;
}
```
* **Toplam:** $T(N) = O(1) + O(N^2) + O(N) \implies O(N^2)$

---

### Kural 4: Şartlı İfadeler (If-Else)
Bir `if (durum) { T1 } else { T2 }` yapısında toplam zaman:

$$T_{\text{toplam}} = T_{\text{test}} + \max(T_1(N), T_2(N))$$

```c
if (durum) {
    /* O(N) süren arama algoritması */
} else {
    /* O(N^2) süren sıralama algoritması */
}
```
* **Karmaşıklık:** $\max(O(N), O(N^2)) = O(N^2)$

---

## 10. Arama ve Hesaplama Algoritmalarının Analizi

### 1. Doğrusal Arama (Linear Search)

```c
int Arama(int A[], int N, int sayi) {
    int i = 0;
    while (i < N) {
        if (A[i] == sayi) break;
        i++;
    }
    if (i < N) return i;
    else return -1;
}
```

* **En İyi Durum ($T_{\text{best}}$):** Aranan eleman 1. sıradadır $\implies O(1)$
* **En Kötü Durum ($T_{\text{worst}}$):** Aranan eleman en sondadır veya yoktur ($N$ adım) $\implies T(n) = 3N + 3 \implies \Theta(N)$
* **Ortalama Durum ($T_{\text{avg}}$):** Elemanın her indekste olma olasılığı eşit kabul edilirse $\frac{N+1}{2}$ tarama yapılır $\implies \Theta(N)$

---

### 2. İkili Arama (Binary Search - Sıralı Dizide)
İkili arama algoritması **mutlaka sıralı dizilerde** çalışır. Her adımda arama aralığını yarıya düşürür.

```c
int ikiliArama(int A[], int N, int sayi) {
    int sol = 0, sag = N - 1;
    while (sol <= sag) {
        int orta = sol + (sag - sol) / 2; /* Taşmayı önleyen orta nokta hesabı */
        if (A[orta] == sayi) 
            return orta;             /* Eleman bulundu */
        else if (sayi < A[orta]) 
            sag = orta - 1;          /* Sağ yarıyı ele */
        else 
            sol = orta + 1;          /* Sol yarıyı ele */
    }
    return -1;                       /* Bulunamadı */
}
```

#### Adım Adım Aralık Küçülmesi:
* 1. Adım: $N$ eleman
* 2. Adım: $\frac{N}{2^1}$ eleman
* 3. Adım: $\frac{N}{2^2}$ eleman
* $k$. Adım: $\frac{N}{2^k} = 1 \implies N = 2^k \implies k = \log_2 N$

* **En İyi Durum ($T_{\text{best}}$):** Aranan eleman ilk denemede ortadadır $\implies O(1)$
* **En Kötü Durum ($T_{\text{worst}}$):** $T(N) = \log_2 N + 1 \implies O(\log N)$

---

### 3. Matris Çarpımı Analizi

```c
void matrisCarpim(int N, int A[N][N], int B[N][N], int C[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            C[i][j] = 0;
            for (int k = 0; k < N; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}
```

* **Döngü Adım Sayısı:**
  $$T(N) = \sum_{i=0}^{N-1} \sum_{j=0}^{N-1} \sum_{k=0}^{N-1} 1 = N \times N \times N = N^3$$
* **Karmaşıklık:** $T(N) = \Theta(N^3)$

---

## 11. Algoritma Seçim Kriterleri ve Sınava Hazırlık Çalışma Soruları

### Algoritma Seçerken Dikkat Edilecek 6 Altın Kuram:
1. **Doğruluk (Correctness):** Algoritmanın her geçerli girdi için doğru çıktıyı ürettiği kanıtlanmalıdır.
2. **Girdi Boyutu ($N$):** Küçük $N$ değerlerinde ($N < 1000$) karmaşıklığı yüksek algoritmalar dahi kabul edilebilir hızda çalışır; büyük $N$'lerde ise asimptotik derece belirleyicidir.
3. **Zaman ve Bellek Dengesi (Trade-off):** Bellek gereksinimi artırılarak çalışma zamanı düşürülebilir (Örn: Hash tabloları).
4. **Veri Yapısı Uyumu:** Seçilen algoritma altındaki veri yapısına tam uyumlu olmalıdır (Örn: Bağlı listede İkili Arama yapılamaz, $O(N)$ sürer).
5. **Kararlılık (Stability):** Eşit anahtarlı elemanların sırasını koruyup korumadığı kontrol edilmelidir.
6. **En Kötü vs. Ortalama Durum:** Kritik sistemlerde (savunma, tıp) ortalama durum değil, her zaman en kötü durum ($T_{\text{worst}}$) baz alınır.

---

### Sınava Hazırlık Çalışma Soruları

**S1:** $T(n) = 4n^2 + 3n + 10$ **fonksiyonunun Big-$O$ ve Big-$\Theta$ gösterimini bulunuz ve $c, n_0$ değerlerini belirleyiniz.**

> **Cevap:**  
> Baskın terim $n^2$ olduğundan ifade $\Theta(n^2)$ ve $O(n^2)$'dir.  
> $4n^2 + 3n + 10 \le c \cdot n^2$ eşitsizliğinde $n \ge 1$ için $3n \le 3n^2$ ve $10 \le 10n^2$ yazılabilir.  
> Buradan $4n^2 + 3n^2 + 10n^2 = 17n^2$ bulunur.  
> **Seçim:** $c = 17$ ve $n_0 = 1$ için ispat tamamlanır.

---

**S2: C dilindeki `struct` ile `union` arasındaki bellek farkı nedir? Örnekle açıklayınız.**

> **Cevap:**  
> `struct` içerisindeki tüm elemanlar için ayrı ayrı bellek alanı ayrılır (Toplam alan = Elemanların boyutları toplamı).  
> `union` içerisinde ise tüm elemanlar tek bir ortak bellek alanını paylaşır (Toplam alan = En büyük elemanın boyutu).

---

**S3: İkili arama (Binary Search) algoritmasının çalışabilmesi için dizide aranan ön şart nedir? Neden?**

> **Cevap:**  
> Dizi **sıralı (sorted)** olmalıdır. Çünkü algoritma orta elemana bakarak aranan elemanın sağda mı yoksa solda mı olduğunu eler. Dizi sıralı değilse elenen yarıda elemanın bulunmadığı garanti edilemez.

---

**S4:** $1000n^2 + 500n$ **ifadesinin $O(n^3)$ olduğunu ispatlayınız.**

> **Cevap:**  
> $1000n^2 + 500n \le c \cdot n^3$ eşitsizliğinde iki tarafı $n^2$'ye bölersek: $1000 + \frac{500}{n} \le c \cdot n$.  
> $n \ge 1$ için $1000 + 500 = 1500 \le c \cdot n$ olur.  
> $c = 1500$ ve $n_0 = 1$ seçilirse eşitsizlik her $n \ge 1$ için sağlandığından ifade **DOĞRUDUR**. *(Not: $n^2$ mertebesi $n^3$'ün alt kümesidir).*

---

**S5: Aşağıdaki kod bloğunun çalışma zamanı karmaşıklığı nedir?**

```c
for (int i = 1; i <= N; i = i * 2) {
    /* Sabit zamanlı işlem O(1) */
}
```

> **Cevap:**  
> Döngü değişkeni $i$ her turda 2 ile çarpılmaktadır: $1, 2, 4, 8, 16, \dots, 2^k$.  
> $2^k \le N \implies k = \log_2 N$.  
> Karmaşıklık $\Theta(\log N)$ olur.
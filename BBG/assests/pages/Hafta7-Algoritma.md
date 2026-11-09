## 📌 İçindekiler

1. [Algoritma Tanımı ve Temel Özellikler](#1-algoritma-tanımı-ve-temel-özellikler)
2. [Algoritmaların İfade Edilme Türleri](#2-algoritmaların-ifade-edilme-türleri)
3. [Algoritma Doğruluğu ve Analizi](#3-algoritma-doğruluğu-ve-analizi)
4. [Akış Şeması (Flowchart) Simgeleri ve Yapıları](#4-akış-şeması-flowchart-simgeleri-ve-yapıları)
5. [Döngü Çeşitleri ve Kontrol İfadeleri](#5-döngü-çeşitleri-ve-kontrol-ifadeleri)
6. [Giriş ve Çıktı Türleri](#6-giriş-ve-çıktı-türleri)
7. [İteratif vs Rekürsif Yaklaşım Kıyaslaması (Zaman ve Hafıza Analizi)](#7-i̇teratif-vs-rekürsif-yaklaşım-kıyaslaması-zaman-ve-hafıza-analizi)
8. [Matematiksel ve Mantıksal Kod Örnekleri (Adım Adım İzleme)](#8-matematiksel-ve-mantıksal-kod-örnekleri-adım-adım-i̇zleme)
9. [Algoritma ve İlişki Tanımlama Yöntemleri](#9-algoritma-ve-i̇lişki-tanımlama-yöntemleri)

---

## 1. Algoritma Tanımı ve Temel Özellikler

Algoritma, bir problemin çözümünde adım adım izlenecek mantıksal yol anlamına gelir. Tüm programlama dillerinin temel omurgasını oluşturur.

### Bir Algoritmada Bulunması Gereken Temel Özellikler

* **Etkinlik ve Genel Olma:** Algoritma gereksiz tekrarlardan arındırılmış olmalıdır. Farklı giriş değerleri ve genel koşullar altında doğru sonuca ulaşabilmeli; gerektiğinde başka algoritmaların içinde alt yordam olarak çalışabilmelidir.
* **Sonlu Olma (Finiteness):** Algoritma her türlü veri girdisinde sonlu sayıda adım sonunda bitmelidir, sonsuz döngüye girmemelidir.
* **Yanılmazlık (Determinizm):** Aynı giriş verileriyle tekrar çalıştırıldığında her zaman aynı çıktıları vermelidir.
* **Giriş / Çıktı Tanımlı Olma:** Algoritmanın dışarıdan alınan $0$ veya daha fazla **giriş bilgisi** olmalı; işleme tabi tutulan bu veriler sonucunda en az $1$ adet **çıktı bilgisi** üretilmelidir.
* **Başarım (Performans):** Minimum donanım gereksinimi (bellek/hafıza) ve minimum çalışma süresi (zaman) ile yüksek başarım hedeflemelidir.

---

## 2. Algoritmaların İfade Edilme Türleri

Algoritmalar temel olarak 3 ana yöntemle ifade edilir:

1. **Metinsel Tanımlama (Doğal Dil):** Günlük konuşma dili ile adım adım yazılan ifadelerdir.
2. **Kaba-Kod (Pseudo Code):** Yarı programlama dili kuralları, yarı konuşma dili ile oluşturulan, herhangi bir veri yapısına bağımlı olmayan genel tasarım taslağıdır.
3. **Akış Şemaları (Flowcharts):** Algoritmanın geometrik şekiller ve oklar yardımıyla görselleştirilmesidir.

```
+──────────────────┐     +──────────────────┐     +──────────────────┐
│ Metinsel Tanım   │ ──► │ Pseudo Code      │ ──► │ Gerçek Kod       │
│ (Doğal Dil)      │     │ (Taslak Yapı)    │     │ (Java/C++/Python)│
+──────────────────┘     +──────────────────┘     +──────────────────┘
```

---

## 3. Algoritma Doğruluğu ve Analizi

### Algoritmanın Doğruluğu (Correctness)

Bir algoritma, tanımlanan tüm geçerli giriş verileri kümesi için beklenen doğru çıktıyı uretiyorsa **doğrudur**. 

* **Hangi Durumda Yanlıştır?** 
  * Algoritma en az bir geçerli giriş verisi için yanlış bir çıktı üretiyorsa,
  * Belirlenen girdi için sonsuz döngüye girip sonlanmıyorsa algoritma **yanlıştır** denir.

### Algoritma Analizi (Algorithm Analysis)

Algoritma analizi, bir algoritmanın çalışması için gerekli olan kaynakları (resource) inceleyen bilgisayar bilimleri dalıdır. Temel olarak şu iki durumu ele alır:

* **Zaman Karmaşıklığı (Time Complexity):** Algoritmanın çalışması sırasında yürüttüğü işlem sayısı ve geçen süredir.
* **Alan Karmaşıklığı (Space Complexity):** Algoritmanın yürütülmesi aşamasında ihtiyaç duyduğu bellek (RAM) miktarıdır.

---

## 4. Akış Şeması (Flowchart) Simgeleri ve Yapıları

### 4.1. Akış Şeması Simgeleri

| Simge | İşlev / Adı | Açıklama |
| :---: | :--- | :--- |
| `[ Oval / Elips ]` | **Başla / Bitir** | Algoritmanın başlangıç ve bitiş noktalarını gösterir. |
| `[/ Paralelkenar /]` | **Genel Girdi / Çıktı** | Klavyeden veri okuma veya ekrana yazdırma işlemleri. |
| `[ Dikdörtgen ]` | **Genel İşlem (Process)** | Atama, matematiksel hesaplama ve veri dönüştürme. |
| `< Eşkenar Dörtgen >` | **Denetim (Karar/Dallanma)** | Mantıksal karşılaştırma ($<, >, =, \le, \ge, \neq$). |
| `[ Dalgalı Altlı Dörtgen ]` | **Yazıcı / Görüntü Çıktısı**| Ekran veya kağıt çıktılarını temsil eder. |
| `[ Köşeleri Kesik Dörtgen ]` | **Döngü (Loop)** | Sayaçlı döngü başlangıçlarını belirtir. |
| `( Daire )` | **Bağlaç (Connector)** | Farklı akış çizgilerini tek noktada birleştirir. |
| `[ Altıgen / Sayfa Bağlacı ]` | **Sayfa Bağlacı** | Sayfalar arası akış geçişlerini sağlar. |

### 4.2. Akış Şeması Yapı Türleri

* **Sıralı Akış Şemaları:** Adımların yukarıdan aşağıya doğru düz bir hat üzerinde ilerlediği, dallanma içermeyen yapılardır.
* **Mantıksal Akış Şemaları:** Koşul ifadelerine (`if-else`) bağlı kararlar ve sapmalar içeren yapılardır.
* **Yinelemeli / Döngülü Akış Şemaları:** Belirli adımların koşul sağlandığı sürece tekrar tekrar çalıştırıldığı yapılardır.

---

## 5. Döngü Çeşitleri ve Kontrol İfadeleri

Bir iş birden fazla kez tekrarlanacaksa, kod bloğu bir kez yazılır ve döngü deyimleriyle yürütülür. Döngünün bir kez icra edilmesine **döngünün bir adımı (bir tur / iteration)** denir.

### 5.1. While Döngüsü (Ön Koşullu)

Döngüye girmeden önce koşul kontrol edilir. Koşul `Yanlış` ise döngü bloğu hiç çalışmaz.

```text
While <koşul>
    Yönerge 1
    Yönerge 2
EndWhile
```

### 5.2. Repeat-Until Döngüsü (Son Koşullu)

İşlemler en az bir kez yürütülür, ardından koşul kontrol edilir. Belirtilen koşul **Doğru (True) oluncaya kadar** döngü tekrarlanır.

```text
Repeat
    Yönerge 1
    Yönerge 2
Until <koşul>
```

### 5.3. For Döngüsü (Sayaçlı)

Tekrar sayısı önceden belli olan durumlarda kullanılır.

```text
for (ifade1; ifade2; ifade3) {
    Deyim1;
    Deyim2;
}
```

### 5.4. GoTo Deyimi ve Döngü Bloku Dışına/İçine Atlatma

`GoTo`, bir etiket (label) kullanarak program akışını doğrudan belirtilen satıra yönlendirir. Metodlar arası geçişte veya `switch-case` yapıları arasında atlama yapmak amacıyla kullanılır.

```csharp
Etiketimiz:
int i = 0;
if (i == 0) {
    // İşlemler
    goto Etiketimiz;
}
```

---

## 6. Giriş ve Çıktı Türleri

* **Giriş Verileri:** Klavyeden girilen değerler, veritabanından çekilen kayıtlar, bir dosyadan okunan metinler veya bir sensörden alınan ölçümler olabilir.
* **Çıktı Verileri:** Ekrana yazdırılan sonuçlar, oluşturulan dosyalar, veritabanına eklenen veriler veya bir aygıta gönderilen kontrol sinyalleri olabilir.

---

## 7. İteratif vs Rekürsif Yaklaşım Kıyaslaması (Zaman ve Hafıza Analizi)

Faktöriyel hesaplama fonksiyonu ($n!$) üzerinden iki farklı metodoloji incelemesi:

### Kod Yapıları (Java Örneği)

```java
// YAPI BİR: Rekürsif (Özyinelemeli) Yaklaşım
public int F_Rekursif(int n) {
    if (n <= 1)
        return 1;
    return n * F_Rekursif(n - 1);
}

// YAPI İKİ: İteratif (Döngülü) Yaklaşım
public int F_Iteratif(int n) {
    int sonuc = 1;
    for (int i = 1; i <= n; i++) {
        sonuc *= i;
    }
    return sonuc;
}
```

### Karşılaştırma Analiz Tablosu

| Kriter | Yapı Bir (Rekürsif) | Yapı İki (İteratif) |
| :--- | :--- | :--- |
| **Mantık** | Fonksiyonun kendisini çağırması | `for` veya `while` döngüsü kullanımı |
| **Hafıza (Space)** | **Yüksek Maliyet $\mathcal{O}(n)$**<br>Her çağrı için Call Stack üzerinde yeni bir frame açılır. | **Düşük Maliyet $\mathcal{O}(1)$**<br>Sadece sabit değişkenler (`sonuc`, `i`) bellekte yer tutar. |
| **Zaman (Time)** | **Daha Yavaş $\mathcal{O}(n)$**<br>Fonksiyon çağrı yükü (function call overhead) mevcuttur. | **Daha Hızlı $\mathcal{O}(n)$**<br>İşlemci seviyesinde döngü adımları doğrudan yürütülür. |
| **Stack Overflow Riski**| **Var** (Büyük $n$ değerlerinde yığın taşar) | **Yok** |

---

## 8. Matematiksel ve Mantıksal Kod Örnekleri (Adım Adım İzleme)

### Örnek 1: Değişken Değerlerinin Yer Değiştirmesi (Swap İşlemi)

```text
Z = X
X = Y
Y = Z
```
* **Açıklama:** Geçici bir `Z` değişkeni kullanılarak `X` ve `Y` değişkenlerinin içeriklerinin takas edilmesi (swap) işlemidir.

---

### Örnek 2: Şartlı İfade Takibi

```text
a = 3
if (a > 5) then
    b = 2 * a
    c = b * b
else
    b = a + 3
    c = b * b
```
* **Adım Adım İzleme:**
  1. $a = 3$ olarak veriliyor.
  2. $a > 5 \implies 3 > 5$ şartı **Yanlış (False)** olur.
  3. `else` bloğu çalışır:
     * $b = a + 3 = 3 + 3 = 6$
     * $c = b * b = 6 * 6 = 36$
* **Sonuç:** $a = 3$, $b = 6$, $c = 36$.

---

### Örnek 3: Sayının Basamaklarını Ters Çevirme (Mod ve Bölme)

```text
1. Başla
2. N <- 1234
3. T <- 0
4. Döngü N > 0 olduğu sürece
    K <- N mod 10
    T <- T * 10 + K
    N <- N / 10 (tamsayı bölme)
5. Yaz(T)
6. Bitir
```

* **Adım Adım İzleme:**
  * **1. Tur:** $N=1234$, $K=4$, $T=0*10+4=4$, $N=123$
  * **2. Tur:** $N=123$, $K=3$, $T=4*10+3=43$, $N=12$
  * **3. Tur:** $N=12$, $K=2$, $T=43*10+2=432$, $N=1$
  * **4. Tur:** $N=1$, $K=1$, $T=432*10+1=4321$, $N=0$
* **Çıktı:** `4321` (Sayı ters çevrilmiştir).

---

### Örnek 4: İkinci Dereceden Denklem Köklerini Bulan Akış Şeması Algoritması

$ax^2 + bx + c = 0$ denklemi için:

```text
1. Başla
2. a, b, c değerlerini oku
3. Δ = b^2 - 4ac
4. Eğer Δ > 0 ise:
    x1 = (-b + √Δ) / (2a)
    x2 = (-b - √Δ) / (2a)
    Yaz(x1, x2)
5. Değilse eğer Δ = 0 ise:
    x = -b / (2a)
    Yaz(x)
6. Aksi halde:
    Yaz("Reel Kök Yoktur")
7. Dur
```

---

## 9. Algoritma ve İlişki Tanımlama Yöntemleri

Yazılım ve sistem mimarisinde algoritmalar ile bileşenler arasındaki ilişkileri ifade etmek için aşağıdaki modelleme standartları kullanılır:

* **Metinsel Tanımlama** & **Akış Şeması**
* **N-S (Nassi-Shneiderman) Şemaları:** Kutucuklar halinde kontrol yapılarını gösteren görsel düzen.
* **W-O (Warnier-Orr) Şemaları:** Küme parantezleri ile veri ve süreç hiyerarşisini belirten grafiksel temsil.
* **UML (Unified Modeling Language):** Nesne yönelimli sistemlerin diyagramlarla (Activity, Sequence, Class) modellenmesi.
* **SysML (System Modeling Language):** Sistem mühendisliği süreçleri için UML genişletmesi.
* **IDEF1XERD & Crow's Foot Notasyonları:** Veritabanı ilişki modelleri.
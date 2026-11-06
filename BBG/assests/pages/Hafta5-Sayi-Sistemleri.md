
>
> **Konu Kapsamı:** Konumsal sayı sistemleri (Desimal, Binary, Oktal, Hexadecimal), MSB/LSB kavramları, tabanlar arası dönüşümler (bölme-2, çarpma-2 metotları), tam ve ondalıklı sayı dönüşümleri, ikilik/oktal/hex sistemlerde 4 işlem (elde ve borç mekanizmaları), 1'e ve 2'ye tümleyen (1's & 2's Complement) yöntemleriyle çıkarma, 7/8 ve 15/16 tümleyen hesapları.

---

## İçindekiler

1. [Konumsal Sayı Sistemleri ve Taban Kavramı](#1-konumsal-sayı-sistemleri-ve-taban-kavramı)
2. [Bit Etiketleri: MSB ve LSB Kavramları](#2-bit-etiketleri-msb-ve-lsb-kavramları)
3. [Taban Dönüşümleri (Conversion Methods)](#3-taban-dönüşümleri-conversion-methods)
   * [3.1 Binary - Desimal Dönüşümü](#31-binary---desimal-dönüşümü)
   * [3.2 Desimal - Binary Dönüşümü (Bölme-2 Metodu)](#32-desimal---binary-dönüşümü-bölme-2-metodu)
   * [3.3 Tam ve Ondalıklı Sayıların Dönüşümü (Çarpma-2 Metodu)](#33-tam-ve-ondalıklı-sayıların-dönüşümü-çarpma-2-metodu)
   * [3.4 Oktal (8'lik) ve Hexadecimal (16'lık) Dönüşümleri](#34-oktal-8lik-ve-hexadecimal-16lık-dönüşümleri)
4. [Hızlı Dönüşüm Yöntemleri (Gruplama Metodu)](#4-hızlı-dönüşüm-yöntemleri-gruplama-metodu)
5. [İkilik (Binary) Sistemde 4 İşlem](#5-ikilik-binary-sistemde-4-işlem)
6. [Tümleyen (Complement) Yoluyla Çıkarma İşlemleri](#6-tümleyen-complement-yoluyla-çıkarma-işlemleri)
   * [6.1 Binary Sistemde 1'e ve 2'ye Tamamlama](#61-binary-sistemde-1e-ve-2ye-tamamlama)
   * [6.2 Oktal Sistemde 7'ye ve 8'e Tamamlama](#62-oktal-sistemde-7ye-ve-8e-tamamlama)
   * [6.3 Hexadecimal Sistemde 15'e ve 16'ya Tamamlama](#63-hexadecimal-sistemde-15e-ve-16ya-tamamlama)
7. [Oktal ve Hexadecimal Sistemlerde Aritmetik ve 4 İşlem](#7-oktal-ve-hexadecimal-sistemlerde-aritmetik-ve-4-işlem)
8. [Sınava Hazırlık Örnek Soruları ve Çözümleri](#8-sınava-hazırlık-örnek-soruları-ve-çözümleri)

---

## 1. Konumsal Sayı Sistemleri ve Taban Kavramı

Sayı sistemleri, sayıların ifade edilmesinde kullanılan taban değerine (radix/base) göre adlandırılır. Günlük hayatta **Desimal (Onluk)** sistem kullanılırken, dijital devreler ve mikroişlemciler ikili mantıkla (0 ve 1) çalıştığı için **Binary (İkilik)** sistem kullanılır.

Bir taban-$b$ sayı sisteminde genel konumsal değer formülü:

$$
(d_k d_{k-1} \dots d_1 d_0 . d_{-1} d_{-2} \dots d_{-m})_b = \sum_{i=-m}^{k} d_i \cdot b^i
$$

### Yaygın Kullanılan Sayı Sistemleri Karşılaştırması

| Sistem | Taban ($b$) | Kullanılan Rakamlar / Semboller | Örnek Gösterim |
| :--- | :---: | :--- | :--- |
| **Binary (İkilik)** | **2** | `0, 1` | $(101101)_2$ |
| **Oktal (Sekizlik)** | **8** | `0, 1, 2, 3, 4, 5, 6, 7` | $(564)_8$ |
| **Desimal (Onluk)** | **10** | `0, 1, 2, 3, 4, 5, 6, 7, 8, 9` | $(365)_{10}$ |
| **Hexadecimal (Onaltılık)** | **16** | `0-9, A(10), B(11), C(12), D(13), E(14), F(15)` | $(FA54)_{16}$ |

---

## 2. Bit Etiketleri: MSB ve LSB Kavramları

Bir ikilik (binary) dizilimde bitlerin bulundukları basamak pozisyonuna göre değer dereceleri vardır:

* **MSB (Most Significant Bit - En Önemli / En Yüksek Değerli Bit):** Bir binary sayının en soldaki, basamak değeri en yüksek olan bitidir.
* **LSB (Least Significant Bit - En Önemsiz / En Düşük Değerli Bit):** Bir binary sayının en sağdaki, basamak değeri en düşük olan bitidir ($2^0$).

### 8-Bit Örnek Dizilim

| Bit konumu | 7 (MSB) | 6 | 5 | 4 | 3 | 2 | 1 | 0 (LSB) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Bit değeri | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 0 |

---

## 3. Taban Dönüşümleri (Conversion Methods)

### 3.1 Binary - Desimal Dönüşümü

Her dijit, bulunduğu konuma karşılık gelen $2^i$ kuvveti ile çarpılır ve sonuçlar toplanır.

**Örnek i:** $(101011)_2 = (?)_{10}$

$$
1 \cdot 2^5 + 0 \cdot 2^4 + 1 \cdot 2^3 + 0 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0 = 32 + 0 + 8 + 0 + 2 + 1 = (43)_{10}
$$

**Örnek ii:** $(1011)_2 = (?)_{10}$

$$
1 \cdot 2^3 + 0 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0 = 8 + 0 + 2 + 1 = (11)_{10}
$$

---

### 3.2 Desimal - Binary Dönüşümü (Bölme-2 Metodu)

Desimal tamsayılar binarye çevrilirken sayı sürekli **2'ye bölünür**. Bölüm 0 olana kadar elde edilen kalanlar **sondan başa doğru (tersten)** yazılır.

**Örnek:** $(33)_{10} = (?)_2$

| Bölünen | Bölüm | Kalan |
| ---: | ---: | ---: |
| 33 | 16 | 1 (LSB) |
| 16 | 8 | 0 |
| 8 | 4 | 0 |
| 4 | 2 | 0 |
| 2 | 1 | 0 |
| 1 | 0 | 1 (MSB) |

Tersten okuduğumuzda: $(33)_{10} = (100001)_2$

---

### 3.3 Tam ve Ondalıklı Sayıların Dönüşümü (Çarpma-2 Metodu)

Ondalıklı bir desimal sayının binarye çevrilmesi **2 aşamada** gerçekleşir:
1. **Tam Kısım:** Bölme-2 metodu ile çevrilir.
2. **Ondalıklı Kısım:** **Çarpma-2 metodu** ile çevrilir. Ondalıklı kısım tam olarak `,00` elde edilene kadar sürekli 2 ile çarpılır. Çarpmalardan elde edilen tam kısımlar **yukarıdan aşağıya (düz sırada)** alınır.

**Örnek:** $(8,875)_{10} = (?)_2$

* **1. Aşama (Tam Kısım):** $(8)_{10}$
  * $8 / 2 = 4$ (Kalan 0)
  * $4 / 2 = 2$ (Kalan 0)
  * $2 / 2 = 1$ (Kalan 0)
  * $1 / 2 = 0$ (Kalan 1) $\rightarrow (8)_{10} = (1000)_2$

* **2. Aşama (Ondalıklı Kısım):** $0,875$
  * $0,875 \times 2 = \mathbf{1},75 \rightarrow$ Tam kısım: **1** (Ondalık kısım kaldı: $0,75$)
  * $0,750 \times 2 = \mathbf{1},50 \rightarrow$ Tam kısım: **1** (Ondalık kısım kaldı: $0,50$)
  * $0,500 \times 2 = \mathbf{1},00 \rightarrow$ Tam kısım: **1** (Ondalık kısım: $0,00 \rightarrow$ İşlem bitti!)

Tam kısımlar sırasıyla: `,111`

**Birleştirilmiş Sonuç:** $(8,875)_{10} = (1000,111)_2$

#### Ondalıklı Binary Sayının Desimale Çevrimi:
Virgülün sağındaki dijitler negatif 2 kuvvetleri ile çarpılır ($2^{-1} = 0.5$, $2^{-2} = 0.25$, $2^{-3} = 0.125, \dots$).

**Örnek:** $(100,10001)_2 = (?)_{10}$

$$
= 1 \cdot 2^2 + 0 \cdot 2^1 + 0 \cdot 2^0 + 1 \cdot 2^{-1} + 0 \cdot 2^{-2} + 0 \cdot 2^{-3} + 0 \cdot 2^{-4} + 1 \cdot 2^{-5}
$$

$$
= 4 + 0.5 + \frac{1}{32} = 4 + 0.5 + 0.03125 = (4,53125)_{10}
$$

---

### 3.4 Oktal (8'lik) ve Hexadecimal (16'lık) Dönüşümleri

#### Oktal - Desimal Dönüşümü:
Her dijit $8^i$ ile çarpılır.
* Örnek: $(564)_8 = 5 \cdot 8^2 + 6 \cdot 8^1 + 4 \cdot 8^0 = 320 + 48 + 4 = (372)_{10}$

#### Desimal - Oktal Dönüşümü (Bölme-8 Metodu):
Sayı sürekli 8'e bölünür, kalanlar tersten yazılır.
* Örnek: $(365)_{10} = (?)_8$
  * $365 / 8 = 45$ (Kalan **5**)
  * $45 / 8 = 5$ (Kalan **5**)
  * $5 / 8 = 0$ (Kalan **5**) $\rightarrow (365)_{10} = (555)_8$

#### Hexadecimal - Desimal Dönüşümü:
Her dijit $16^i$ ile çarpılır ($A=10, B=11, C=12, D=13, E=14, F=15$).
* Örnek: $(FA54)_{16} = 15 \cdot 16^3 + 10 \cdot 16^2 + 5 \cdot 16^1 + 4 \cdot 16^0$
  * $= 15 \cdot 4096 + 10 \cdot 256 + 5 \cdot 16 + 4 \cdot 1 = 61440 + 2560 + 80 + 4 = (64084)_{10}$

#### Desimal - Hexadecimal Dönüşümü (Bölme-16 Metodu):
Sayı sürekli 16'ya bölünür, kalanlar hex sembole çevrilip tersten yazılır.
* Örnek: $(8125)_{10} = (?)_{16}$
  * $8125 / 16 = 507$ (Kalan **13** $\rightarrow$ **D**)
  * $507 / 16 = 31$ (Kalan **11** $\rightarrow$ **B**)
  * $31 / 16 = 1$ (Kalan **15** $\rightarrow$ **F**)
  * $1 / 16 = 0$ (Kalan **1** $\rightarrow$ **1**) $\rightarrow (8125)_{10} = (1FBD)_{16}$

---

## 4. Hızlı Dönüşüm Yöntemleri (Gruplama Metodu)

Mikroişlemci mimarisinde ikilik diziler ile sekizlik/heksadesimal diziler arasında taban dönüşümü yaparken araya desimal sayı koymadan **bit gruplama** yöntemi kullanılır:

### A. Binary $\leftrightarrow$ Oktal ($8 = 2^3 \rightarrow 3$'erli Gruplama)
* **Binary'den Oktal'a:** Sayı sağdan başlanarak (LSB tarafı) **3'erli gruplara** ayrılır. Her grubun oktal değeri yazılır.
  * Örnek: $(11101001)_2 = (?)_8$
  * En sola sıfır ekleyerek 3'erli yapalım: `011 101 001`
  * `011` $= 3$, `101` $= 5$, `001` $= 1 \implies (351)_8$

### B. Binary $\leftrightarrow$ Hexadecimal ($16 = 2^4 \rightarrow 4$'erli Gruplama)
* **Binary'den Hex'e:** Sayı sağdan başlayarak **4'erli gruplara** ayrılır.
* **Hex'ten Binary'ye:** Her hex basamağı **4 bitlik binary** karşılığı ile genişletilir.
  * Örnek: $(FA752)_{16} = (?)_2$
  * $F = 1111_2$
  * $A = 1010_2$
  * $7 = 0111_2$
  * $5 = 0101_2$
  * $2 = 0001_2$ *(veya 4 bitlik $0010_2$)*
  * Sonuç: $(FA752)_{16} = (1111 \, 1010 \, 0111 \, 0101 \, 0010)_2$

---

## 5. İkilik (Binary) Sistemde 4 İşlem

### A. Toplama (Addition) Rules & Carry
* $0 + 0 = 0$
* $0 + 1 = 1$
* $1 + 0 = 1$
* $1 + 1 = 0$ (Elde / Carry $C = 1$)
* $1 + 1 + 1 = 1$ (Elde / Carry $C = 1$)
* $1 + 1 + 1 + 1 = 0$ (Elde $10_2$, bir sonraki basamağa $0$ geçer, 2 sonraki basamağa elde $1$ kayar)

**Örnek Toplama İşlemi:**

$$
\begin{array}{r}
  1001\,1111\,0001_2 \\
+ 0010\,0101\,1101_2 \\
\hline
  1100\,0100\,1110_2
\end{array}
$$

---

### B. Çıkarma (Subtraction) Rules & Borrow
* $0 - 0 = 0$
* $1 - 1 = 0$
* $1 - 0 = 1$
* $0 - 1 = 1$ (Üst basamaktan 1 borç / **Borrow $X$** alınır. Alınan borç o basamakta $2_{10}$ değerindedir).

**Örnek Direkt Çıkarma İşlemi:**

$$
\begin{array}{r}
  1101\,1001\,1001_2 \\
- 1010\,0101\,1101_2 \\
\hline
  0011\,0011\,1100_2
\end{array}
$$

---

### C. Çarpma (Multiplication) Rules
* $0 \times 0 = 0$
* $1 \times 0 = 0$
* $0 \times 1 = 0$
* $1 \times 1 = 1$

---

### D. Bölme (Division) Rules
* $0 / 1 = 0$
* $1 / 1 = 1$
* $1 / 0 =$ Tanımsız (Mikroişlemcilerde "Divide by Zero" hatası oluşturur).

---

## 6. Tümleyen (Complement) Yoluyla Çıkarma İşlemleri

Mikroişlemcilerin Aritmetik Mantık Birimlerinde (ALU) özel bir çıkarma devresi tasarlamak yerine çıkarma işlemleri **toplama devresi üzerinden** tümleyen yöntemiyle gerçekleştirilir.

### 6.1 Binary Sistemde 1'e ve 2'ye Tamamlama

* **1 Tamamlayıcısı (1's Complement):** Pratik olarak sayının tüm bitlerinin tersi alınarak ($0 \rightarrow 1; \, 1 \rightarrow 0$) bulunur.
* **2 Tamamlayıcısı (2's Complement):** Sayının 1 tamamlayıcısına 1 eklenerek bulunur.
  

  $$
  \text{2 Tamamlayıcısı} = \text{1 Tamamlayıcısı} + 1
  $$

---

#### 1- 1 Tamamlayıcısı Yardımıyla Çıkarma Kuralları:
1. Çıkan sayının (çıkarılan ikinci sayının) **1 tamamlayıcısı** alınır.
2. Ana sayı ile çıkan sayının 1 tamamlayıcısı **toplanır**.
3. **Taşma Kontrolü:**
   * En solda **artan "1" (Elde) varsa:** Sonuç **pozitiftir**. Bu elde en sağdaki bit ile toplanır (End-around carry).
   * **Artan "1" yoksa:** Sonuç **negatiftir**. Gerçek sonucu bulmak için elde edilen toplamın tekrar **1 tamamlayıcısı** alınır ve önüne eksi ($-$) işareti konur.

**Örnek (1 Tamamlayıcısı ile Çıkarma):**

$$
1101 \, 1001 \, 1001_2 - 1010 \, 0101 \, 1101_2
$$

1. Çıkan sayının 1 tümleyeni: $1010 \, 0101 \, 1101 \xrightarrow{\text{Tersi}} 0101 \, 1010 \, 0010$
2. Ana sayı ile topla:
   

   $$
   \begin{array}{r}
     1101\,1001\,1001_2 \\
   + 0101\,1010\,0010_2 \\
   \hline
   (1)\,0011\,0011\,1011_2
   \end{array}
   $$

3. Artan "1"'i en sağa ekle:
   

   $$
   \begin{array}{r}
     0011\,0011\,1011_2 \\
   + 0000\,0000\,0001_2 \\
   \hline
     0011\,0011\,1100_2
   \end{array}
   $$

---

#### 2- 2'ye Tamamlama Yöntemiyle Çıkarma Kuralları:
1. Çıkan sayının **2 tamamlayıcısı** alınır.
2. Ana sayı ile çıkan sayının 2 tamamlayıcısı **toplanır**.
3. **Taşma Kontrolü:**
   * En solda **artan "1" (Elde) varsa:** Sonuç **pozitiftir** ve bu en soldaki "1" **DİKKATE ALINMAZ (ATILIR)**.
   * **Artan "1" yoksa:** Sonuç **negatiftir**. Gerçek sonuç elde edilen toplamın tekrar **2 tamamlayıcısı** alınarak bulunur.

**Örnek (2 Tamamlayıcısı ile Çıkarma):**

$$
1101 \, 1001 \, 1001_2 - 1010 \, 0101 \, 1101_2
$$

1. Çıkanın 2 tümleyeni: $(0101 \, 1010 \, 0010) + 1 = 0101 \, 1010 \, 0011$
2. Ana sayı ile topla:
   

   $$
   \begin{array}{r}
     1101\,1001\,1001_2 \\
   + 0101\,1010\,0011_2 \\
   \hline
   (1)\,0011\,0011\,1100_2
   \end{array}
   $$

**Sonuç:** $(0011 \, 0011 \, 1100)_2$

---

### 6.2 Oktal Sistemde 7'ye ve 8'e Tamamlama

* **7 Tamamlayıcısı:** Oktal sayının her bir dijiti **7** sayısından çıkarılarak bulunur.
* **8 Tamamlayıcısı:** $\text{7 Tamamlayıcısı} + 1$.

#### Çıkarma Yolu:
* **7 Tamamlayıcısı ile:** Toplamda en solda taşan "1" **varsa**, en sağa eklenir. Taşan "1" **yoksa** sonuç negatiftir, tekrar 7 tümleyeni alınır.
* **8 Tamamlayıcısı ile:** Toplamda en solda taşan "1" **varsa DİKKATE ALINMAZ**. Taşan "1" **yoksa** sonuç negatiftir, tekrar 8 tümleyeni alınır.

**Örnek (8 Tamamlayıcısı ile):** $(754)_8 - (456)_8 = (?)_8$
1. $(456)_8$'nin 7 tümleyeni: $(777)_8 - (456)_8 = (321)_8$
2. $(456)_8$'nin 8 tümleyeni: $(321)_8 + 1 = (322)_8$
3. Topla:
   

   $$
   (754)_8 + (322)_8 = (1276)_8
   $$

4. En soldaki "1" taşmıştır $\rightarrow$ **Dikkate alınmaz / Atılır!**
5. **Kalan Sonuç:** $(276)_8$

---

### 6.3 Hexadecimal Sistemde 15'e ve 16'ya Tamamlama

* **15 Tamamlayıcısı:** Hex sayının her dijiti **F ($15_{10}$)** değerinden çıkarılarak bulunur.
* **16 Tamamlayıcısı:** $\text{15 Tamamlayıcısı} + 1$.

*Çıkarma mantığı 2'ye ve 8'e tamamlama kuralları ile tamamen birebir aynıdır (Taşan elde 1 varsa atılır, yoksa sonuç negatiftir ve tekrar 16 tümleyeni alınır).*

---

## 7. Oktal ve Hexadecimal Sistemlerde Aritmetik ve 4 İşlem

### 7.1 Oktal ve Hexadecimal Toplama İşlemi

Basamak basamak toplanır. Eğer toplam basamak tabanını ($8$ veya $16$) geçerse, toplamdan taban çıkarılır ve bir üst basamağa elde ($C=1$) aktarılır.

#### A. Oktal Toplama Örneği:

$$
\begin{array}{r}
  (340)_8 \\
+ (750)_8 \\
\hline
 (1310)_8
\end{array}
$$

> *Adım Adım:* $4+5 = 9 \rightarrow 9-8 = \mathbf{1}$ (Elde 1). $3+7+1 = 11 \rightarrow 11-8 = \mathbf{3}$ (Elde 1).

#### B. Hexadecimal Toplama Örneği:

$$
\begin{array}{r}
  (A9B30)_{16} \\
+ (BFF50)_{16} \\
\hline
 (169A80)_{16}
\end{array}
$$

> *Adım Adım:*
> * $B + F = 11 + 15 = 26 \rightarrow 26 - 16 = \mathbf{10 \rightarrow A}$ (Elde 1)
> * $9 + F + 1 = 25 \rightarrow 25 - 16 = \mathbf{9}$ (Elde 1)
> * $A + B + 1 = 10 + 11 + 1 = 22 \rightarrow 22 - 16 = \mathbf{6}$ (Elde 1)

---

### 7.2 Oktal ve Hexadecimal Çarpma ve Bölme İşlemi

Slayt standartlarında önerilen ve hata riskini en aza indiren en pratik yol:
1. Sayıları önceden **Desimal (10'luk)** sisteme çevirmek.
2. Çarpma veya bölme işlemini desimal ortamda gerçekleştirmek.
3. Bulunan sonucu tekrar **hedef tabana (Oktal veya Hex)** dönüştürmektir.

---

## 8. Sınava Hazırlık Örnek Soruları ve Çözümleri

### S1: $(33)_{10}$ sayısını ikilik tabana ve $(8,875)_{10}$ sayısını ikilik tabana çeviriniz.

> **Çözüm:**
> * Bölme-2 yöntemi ile $(33)_{10} = (100001)_2$
> * Çarpma-2 yöntemi ile $(8,875)_{10} = (1000,111)_2$

---

### S2: 2'ye tamamlama yöntemiyle $(110110011001)_2 - (101001011101)_2$ çıkarma işlemini adım adım yapınız.

> **Çözüm:**
> 1. Çıkan sayının 1 tümleyeni: `0101 1010 0010`
> 2. Çıkan sayının 2 tümleyeni: `0101 1010 0010 + 1 = 0101 1010 0011`
> 3. Toplama:
>    $$
>    \begin{array}{r}
>      1101\,1001\,1001_2 \\
>    + 0101\,1010\,0011_2 \\
>    \hline
>    (1)\,0011\,0011\,1100_2
>    \end{array}
>    $$
> 4. En soldaki `(1)` elde taşması pozitifliği gösterir ve **atılır**.
> 5. **Sonuç:** $(001100111100)_2$

---

### S3: $(FA752)_{16}$ heksadesimal sayısını direkt gruplama metoduyla ikilik (binary) tabana çeviriniz.

> **Çözüm:**
> * $F \rightarrow 1111$
> * $A \rightarrow 1010$
> * $7 \rightarrow 0111$
> * $5 \rightarrow 0101$
> * $2 \rightarrow 0010$
> * **Sonuç:** $(11111010011101010010)_2$

---

### S4: Oktal sistemde 8'e tamamlama (8's complement) yöntemiyle $(754)_8 - (456)_8$ işlemini yapınız.

> **Çözüm:**
> 1. $(456)_8$'nin 7 tümleyeni: $777 - 456 = (321)_8$
> 2. $(456)_8$'nin 8 tümleyeni: $321 + 1 = (322)_8$
> 3. Ana sayı ile topla: $754 + 322 = (1276)_8$
> 4. En soldaki `1` elde taşması dikkate alınmaz.
> 5. **Sonuç:** $(276)_8$

---

### S5: Hexadecimal ortamda $(A9B30)_{16} + (BFF50)_{16}$ toplama işlemini yapınız.

> **Çözüm:**
> $$
> \begin{array}{r}
>   (A9B30)_{16} \\
> + (BFF50)_{16} \\
> \hline
> (169A80)_{16}
> \end{array}
> $$
> **Sonuç:** $(169A80)_{16}$
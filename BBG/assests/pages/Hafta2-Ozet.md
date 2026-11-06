
## Özet & Soru-Cevap Çalışma Rehberi

---

## 1. YAZILIMIN BİLEŞENLERİ VE DONANIM İLE KARŞILAŞTIRMASI

### Yazılımın 5 Temel Bileşeni

Yazılım sadece koddan ibaret değildir; şu 5 temel unsurun birleşimidir:

1. **Mantık (Algoritma):** Yazılımın en kritik bileşenidir. Kesin sonuca ulaşmak için doğru ile yanlış arasındaki akıl yürütmedir.
2. **Veri (Data) & Bilgi (Information):** Yazılımın temel amacı ham veriyi ($Data$) işleyip anlamlı bilgiye ($Information$) dönüştürmektir.
3. **Belge (Dokümanlar):** Mühendislik disiplini gereği planlama, analiz, tasarım ve test aşamalarındaki çalışmalar belgelenmelidir.
4. **İnsan:** Geliştirici ekip ve sistemi kullanacak nihai kullanıcılar.
5. **Program (Kod):** İşletime alınan ana çıktıdır. Testlerin %100 kapsama ulaşamaması ve dinamik iş ihtiyaçları nedeniyle **sürekli bakım** gerektirir.

### Vizede Kesin Çıkar: Yazılım vs. Donanım Karşılaştırması

| Özellik | Yazılım (Software) | Donanım (Hardware) |
| :--- | :--- | :--- |
| **Üretim Yöntemi** | Geliştirilir (*Engineered*). | Fabrikada seri üretilir (*Manufactured*). |
| **Aşınma / Eskime** | Fiziksel olarak **ESKİMEZ**. Eskime = teknolojinin/ihtiyacın gerisinde kalmaktır. | Zamanla fiziksel olarak **aşınır ve bozulur**. |
| **Yeniden Kullanım** | Parça temini ve yeniden kullanım oranı düşüktür (%1-2). | Dışarıdan hazır parça temini ve değişimi kolaydır. |
| **Hata Toleransı (Yedekleme)** | Aynı yazılımı iki sunucuya kopyalamak mantıksal hatayı çözmez *(Eş yazılım/redundancy gerekir)*. | Fiziksel yedeği eklenerek sistem kesintisiz çalışmaya devam eder. |
| **Maliyet Trendi** | Geliştirme ve bakım maliyetleri **katlanarak artmaktadır**. | Donanım üretim maliyeti giderek **ucuzlamaktadır**. |

---

## 2. ROL TANIMLARI VE YAZILIM MÜHENDİSLİĞİ (IEEE)

* **IEEE Yazılım Mühendisliği Tanımı (1993):** Sistemli, düzenli, ölçülebilir bir yaklaşımın yazılım geliştirmede, yazılımın işlenmesinde ve bakımında uygulanmasıdır.
* **Programcı vs. Yazılım Mühendisi:**
  * Programcı kod yazımına ve uygulamaya odaklanır.
  * Yazılım Mühendisi programcının yeteneklerine sahiptir; ancak mantıksal boyut, insan ilişkileri, yönetim ve **en az maliyetle en yüksek kaliteyi** sağlama odaklı çalışır.
* **Sistem Analisti vs. Yazılım Mühendisi:** Analist sadece *analiz* aşamasıyla ilgilenirken; Yazılım Mühendisi *tüm yaşam döngüsünün* içindedir.

---

## 3. HATALARIN YAYILMA ÖZELLİĞİ VE FMEA FORMÜLÜ

### Hatanın Yayılma Maliyeti

Hata yazılım yaşam döngüsünde ne kadar geç fark edilirse, düzeltme maliyeti katlanarak artar:

* **Analiz Aşaması:** $1\times$ *(En ucuz)*
* **Tasarım Aşaması:** $5\times$
* **Kodlama Aşaması:** $10\times$
* **Test Aşaması:** $25\times$
* **Kabul Testi:** $50\times$
* **İşletim (Canlı Ortam):** $100\times$ *(En pahalı)*

### Risk Öncelik Derecesi (RPN) Formülü

Hata Türleri ve Etkileri Analizi (FMEA) kapsamında risk puanı şöyle hesaplanır:

$$RPN = SEV \times OCCUR \times DETEC$$

* **SEV (Severity):** Hatanın şiddeti / etkisi.
* **OCCUR (Occurrence):** Hatanın ortaya çıkma olasılığı.
* **DETEC (Detection):** Hatanın fark edilme / yakalanma zorluğu.

---

## 4. YAZILIM SİSTEMLERİNİN SINIFLANDIRILMASI

1. **İşlevlerine Göre:** Hesaplama, Veri İşleme (Bankacılık), Süreç Temelli (Gömülü), Kural Temelli (Yapay Zeka/Robotik), CAD, Sinyal İşleme.
2. **Zamana Göre:** Toplu İşleme (*Batch*), Çevrim-içi (*Online*), Gerçek Zamanlı (*Real-Time*).
3. **Boyutlarına Göre (Kod Satır Sayısı - LOC):**
   * **Küçük ($SS < 2.000$):** Öğrenci projeleri, basit PC oyunları.
   * **Orta ($2.000 < SS < 100.000$):** CAD, BDE yazılımları.
   * **Büyük ($100.000 < SS < 1.000.000$):** İşletim Sistemleri.
   * **Çok Büyük ($SS > 1.000.000$):** Komuta Kontrol, Hava Tahmin, Askeri Sistemler.

---

## 5. YAZILIM YAŞAM DÖNGÜSÜ (SDLC) VE ÇEKİRDEK SÜREÇLER

SDLC doğrusal değil, **döngüseldir**. İhtiyaç duyulduğunda önceki adımlara geri dönülür.

### Çekirdek Adımlar (Core Processes):

1. **Planlama:** Fizibilite çalışması yapılır, kaynaklar kestirilir, proje planı oluşturulur.
2. **Çözümleme (Analiz):** Gereksinimler detaylandırılır, mevcut iş incelenir. *(Çıktı: Analiz Raporu)*
3. **Tasarım:** 
   * **Mantıksal Tasarım:** Önerilen sistemin yapısı, örgütsel değişiklikler.
   * **Fiziksel Tasarım:** Yazılım bileşenleri ve ayrıntıları. *(Çıktı: Tasarım Raporu)*
4. **Gerçekleştirim:** Kodlama, test ve kurulum çalışmaları.
5. **Bakım:** Teslim sonrası hata giderme ve yeni işlev ekleme.

---

## 6. SÜREÇ MODELLERİ VE KARŞILAŞTIRMALARI (ÇOK ÖNEMLİ)

Sınavda modellerin **tanımları, avantaj/dezavantajları ve hangi projeye uygun oldukları** sorulur:

### Hızlı Özet (Anahtar Kavramlar)
* **1. Gelişigüzel:** Yöntem yok, kişiye bağımlı (60'lı yıllar).
* **2. Barok:** Doğrusal, belgeleme en sonda yapılır *(Günümüzde kullanılmaz)*.
* **3. Çağlayan (Şelale):** Adım adım ilerler, geri dönüş zor, belirsizlik azsa uygundur.
* **4. V Modeli:** Sol kanat Üretim, sağ kanat Test/Doğrulama (*Verification & Validation*).
* **5. Helezonik:** **RİSK ANALİZİ** odaklı, yinelemeli-artırımlı model.
* **6. Prototipleme:** Gereksinimler belirsizse hızlı maket yapımı.
* **7. Evrimsel:** Pilot bölgede dene, geliştir, dağıt (Bankalar).
* **8. Artırımsal:** Çekirdek sisteme modül modül ekleme yapılması.
* **9. Araştırma Tabanlı:** *"Yap-At"* prototipi, belirsiz AR-GE projeleri.

---

### Süreç Modelleri Detay Tablosu

| Model | Önemli Özelliği / Anahtar Kelime | Uygun Olduğu Proje Türü |
| :--- | :--- | :--- |
| **Gelişigüzel** | Disiplinsiz, kişiye bağımlı, izlenebilirlik ve bakım imkansız. | Öğrenci ders projeleri. |
| **Barok** | Belgelemeyi geliştirme bittikten sonra ayrı süreç olarak görür. | Günümüzde **önerilmez**. |
| **Çağlayan (Waterfall)** | Belgeleme sürecin doğal parçasıdır. Geri dönüşler tanımlıdır. Risk: Müşteri ürünü geç görür. | Gereksinimleri net ve değişmeyecek kısa süreli projeler. |
| **V Modeli** | Sol: Üretim, Sağ: Test. *Verification & Validation* (Doğrulama/Geçerleme) erken başlar. | Belirsizliği az, 2 aşamalı ihale edilen BT projeleri. |
| **Helezonik (Spiral)** | **RİSK ANALİZİ** ana odağıdır. 4 çeyrek: Planlama, Risk Analizi, Üretim, Müşteri Değerlendirmesi. | Büyük, karmaşık ve yüksek riskli projeler. |
| **Prototipleme** | Gereksinimleri netleştirmek için hızlı maket geliştirme. *"Quick & Dirty"* tehlikesi var. | Müşterinin ne istediğini tam bilmediği projeler. |
| **Evrimsel** | Pilot uygulama $\rightarrow$ Test et $\rightarrow$ Diğer birimlere yay. *Keşifçi* ve *Atılacak Prototip* olarak 2'ye ayrılır. | Çok birimli geniş organizasyonlar (Örn: Banka şubeleri). |
| **Artırımsal** | Sistem **Çekirdek Sistem** ile başlar. Her sürümde üzerine özellik eklenir ($Çekirdek + Özellik_1 + Özellik_2$). | Uzun sürecek ama erken kullanılması gereken projeler (Mobil İşletim Sistemleri). |
| **Araştırma Tabanlı** | **Yap-At** prototipidir. Zaman/Maliyet kestirimi yoktur. Sözleşmeli işe UYGUN DEĞİLDİR. | AR-GE, Asal sayı bulma, Satranç algoritmaları. |

---

## 7. METODOLOJİ KAVRAMI VE YAPISAL SİSTEM TASARIMI

* **Metodoloji Tanımı:** Bir BT projesinde yaşam döngüsü boyunca kullanılacak **uyumlu yöntemler bütünüdür**.
  $$\text{Metodoloji} = \text{Süreç Modeli} + \text{Belirtim Yöntemleri}$$
* **Kurumsal Metodoloji Geliştirme:** Yaklaşık **50 adam/aylık** bir iş gücü gerektirir.

### Yapısal Sistem Tasarım Metodolojisi

* **Çağlayan (Waterfall) modelini** temel alır.
* CASE araçları tarafından doğrudan desteklenir.

| Aşama | Kullanılan Yöntem ve Araçlar | Çıktı |
| :--- | :--- | :--- |
| **Planlama** | Veri Akış Şemaları (DFD), Süreç Belirtimleri, Görüşme, Maliyet Kestirimi | **Proje Planı** |
| **Analiz** | Veri Akış Şemaları, ERD (Nesne İlişki Şemaları), Veri Sözlüğü | **Sistem Analiz Raporu** |
| **Analizden Tasarıma Geçiş** | Akışa dayalı analiz, ERD'lerin veritabanı tablosuna dönüştürülmesi | **Başlangıç Tasarım Raporu** |
| **Tasarım** | Yapısal Şemalar, Program Tasarım Dili (PDL), Veritabanı Tabloları | **Sistem Tasarım Raporu** |

---

## 8. SIKÇA SORULAN VİZE SORULARI (HIZLI TEKRAR)

**S1: Yazılım kalitesi projeye nasıl etki eder? (Grafik Özeti)**
> Kalite sistemsiz bir projede adam/ay iş gücü (15) ve masraf (£65 bin) yüksekken; Kalite sistemli projede iş gücü (6 adam/ay) ve masraf (£50 bin) ciddi şekilde düşer. Kalite maliyeti ve iş gücü ihtiyacını düşürür.

**S2: V Süreç Modeli'nin ana bileşenleri nelerdir?**
> 1. *Kullanıcı Modeli* (Kabul testleri)
> 2. *Mimari Model* (Sistem/Altsistem testleri)
> 3. *Gerçekleştirim Modeli* (Modül/Birim testleri)

**S3: Prototiplemenin riskleri/dezavantajları nelerdir?**
> Belgelemesiz (*quick and dirty*) kodlama alışkanlığı yaratabilir, müşteri prototipi tamamlanmış nihai ürün sanabilir, düzeltme aşaması atlanırsa düşük performansa yol açar.

**S4: FMEA'da kullanılan RPN puanı yüksek çıkarsa ne anlama gelir?**
> Hatanın şiddeti yüksek, ortaya çıkma ihtimali fazla ve yakalanması zor demektir. İlgili modüle acil öncelik verilmeli ve test adımları sıkılaştırılmalıdır.

## Taban ve dönüşümler

- Taban-b gösteriminde rakamlar 0 ile `b−1` arasındadır; basamak ağırlığı tabanın kuvvetidir.
- Taban-b'den onluya: basamakları `b^konum` ile çarpıp topla.
- Onludan tam sayı tabanına: art arda böl, kalanları sondan başa oku.
- Kesirli kısmı dönüştürmek için tabanla çarpıp tam kısımları sırayla al.
- 1 hex basamak = 4 bit; 1 octal basamak = 3 bit.

## Sistemler ve basamaklar

| Sistem | Taban | Özel bilgi |
|---|---:|---|
| Binary | 2 | 0, 1 |
| Octal | 8 | 0–7 |
| Decimal | 10 | 0–9 |
| Hexadecimal | 16 | 0–9 ve A–F; A=10, F=15 |

MSB en yüksek, LSB en düşük değerli bittir. Bit dizisinin işaretli mi işaretsiz mi olduğu gösterim biçimine göre belirlenir.

## Aritmetik ve işaret

- Toplam tabana erişirse elde bir sonraki sütuna taşınır.
- İkilikte `1+1=10₂`; ödünç alınan basamak `10₂` değerindedir.
- İkiye tümleyen: bitleri ters çevir, 1 ekle. n bit aralık: `−2^(n−1)` … `2^(n−1)−1`.
- Çıkarma, `A + (B'nin ikiye tümleyeni)` olarak hesaplanabilir.
- İşaretli taşma bit genişliğinin izin verdiği aralığı aşmaktır; son eldeyi atmak taşmayı çözmez.

## Örnek kontrol

`(110101)₂ = 32 + 16 + 4 + 1 = 53`

`(687)₁₀ = (2AF)₁₆`

`(1101 0110)₂ = (D6)₁₆`

### Hızlı tekrar

1. `(100111)₂` sayısını onluya çevir.
2. `(146)₈` sayısını onluya çevir.
3. `(2C)₁₆` sayısını onluya çevir.
4. 8 bit ikiye tümleyen aralığı neden −128 ile 127'dir?


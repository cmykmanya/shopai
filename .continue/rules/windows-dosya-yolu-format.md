---
alwaysApply: true
---

Windows işletim sistemi üzerinde dosya oluştururken veya düzenlerken HER ZAMAN aşağıdaki yol formatını kullan:

- **Ters eğik çizgi (`\`) kullan.**
- **Çift ters eğik çizgi (`\\`) ile yaz.** Örneğin: `C:\\Users\\user\\Documents\\GitHub\\shopai\\dosya.txt`.
- Eğer terminal komutu kullanıyorsan, tek ters eğik çizgi (`\`) yeterlidir. Örneğin: `C:\\Users\\user\\Documents\\GitHub\\shopai\\dosya.txt`.
- **Linux/macOS için ileriye eğik çizgi (`/`) kullan.**

Bu kurala UYMADAN HİÇBİR DOSYA İŞLEMİ YAPMA. Eğer hata alırsan, alternatif bir yöntem dene (örneğin, `edit_existing_file` veya `create_new_file` araçlarını kullan).
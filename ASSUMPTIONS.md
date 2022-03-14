# ASSUMPTIONS

- OS yang dipakai untuk pengetestan dan pengembangan yaitu ubuntu
- boleh memakai embedded database
- tidak menghandle kasus konkurensi
- tidak menghandle data corrupt (misal foreign key tidak ditemukan)
- object tidak dapat diubah setelah dibuat
- tidak ada pengecekan unique
- tidak ada pengecekan customer data
- purchase hanya mengecek quota ticket saja
- transaction berupa data historical
- untuk sekarang, diasumsikan data yang masuk ke Repository sudah tidak perlu divalidasi lagi karena sudah divalidasi di Controller

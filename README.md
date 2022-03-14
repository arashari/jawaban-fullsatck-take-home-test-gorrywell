# Table of Contents

- [Table of Contents](#table-of-contents)
- [database design](#database-design)
  - [Event](#event)
  - [Ticket](#ticket)
  - [Location](#location)
  - [Transaction](#transaction)
  - [EventDetail](#eventdetail)
  - [PurchasedTicket](#purchasedticket)
- [API spec](#api-spec)
- [requirements](#requirements)
  - [tested on](#tested-on)
- [installation](#installation)
  - [1. nodejs 16.x](#1-nodejs-16x)
  - [2. yarn (opsional)](#2-yarn-opsional)
  - [3. clone source code](#3-clone-source-code)
    - [3.a. via git (recommended)](#3a-via-git-recommended)
    - [3.b. via archive](#3b-via-archive)
  - [4. menjalankan aplikasi](#4-menjalankan-aplikasi)
- [limitation](#limitation)
- [TODO](#todo)

# database design

- 3 document utama
  - Event
    - Ticket (embedded)
  - Location
  - Transaction

## Event

| column     | type            | keterangan                   |
| ---------- | --------------- | ---------------------------- |
| id         | string          | PK                           |
| name       | string          |                              |
| startDate  | datetime        | YYYY-MM-DD HH:mm:ss          |
| endDate    | datetime        | YYYY-MM-DD HH:mm:ss          |
| locationId | string          | FK location                  |
| tickets    | array of Ticket | jenis ticket pada event tsb. |

## Ticket

| column       | type   | keterangan                                |
| ------------ | ------ | ----------------------------------------- |
| id           | string | PK                                        |
| name         | string |                                           |
| quota        | int    | >= 0, berkurang seiring dengan purchasing |
| initialQuota | int    | kuota awal ticket                         |
| price        | int    | > 0                                       |

## Location

| column | type   | keterangan |
| ------ | ------ | ---------- |
| id     | string | PK         |
| name   | string |            |

## Transaction

| column        | type                     | keterangan                                                |
| ------------- | ------------------------ | --------------------------------------------------------- |
| id            | string                   | PK                                                        |
| customerName  | string                   |                                                           |
| customerEmail | string                   |                                                           |
| event         | EventDetail              | snapshot data Event pada saat pembelian terjadi           |
| tickets       | array of PurchasedTicket | array of snapshot data Ticket pada saat pembelian terjadi |

## EventDetail

| column    | type            | keterangan                   |
| --------- | --------------- | ---------------------------- |
| id        | string          | FK event                     |
| name      | string          |                              |
| startDate | datetime        | YYYY-MM-DD HH:mm:ss          |
| endDate   | datetime        | YYYY-MM-DD HH:mm:ss          |
| location  | Location        | snapshot data location       |
| tickets   | array of Ticket | jenis ticket pada event tsb. |

## PurchasedTicket

| column   | type   | keterangan        |
| -------- | ------ | ----------------- |
| ticketId | string | FK ticket         |
| name     | string |                   |
| price    | int    |                   |
| quantity | int    |                   |
| total    | int    | price \* quantity |

# API spec

lihat [API.md](https://github.com/arashari/jawaban-fullsatck-take-home-test-gorrywell/blob/master/API.md)

# requirements

- nodejs v13+

## tested on

- ubuntu 20.04.4 LTS
- nodejs v16.11.1
- yarn 1.22.17

# installation

## 1. nodejs 16.x

1. buka terminal, lalu jalankan perintah berikut

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

2. setelah proses selesai, `nodejs` bisa diinstall dengan perintah berikut

```bash
sudo apt-get install -y nodejs
```

## 2. yarn (opsional)

1. pastikan Anda sudah menginstall `nodejs` terlebih dahulu (lihat [1. nodejs 16.x](#1-nodejs-16x))
2. buka terminal, dan jalankan perintah berikut

```
npm install --global yarn
```

## 3. clone source code

untuk mendapatkan source code aplikasi ini, silakan gunakan salah satu cara berikut:

### 3.a. via git (recommended)

1. pastikan Anda sudah menginstall `git`. jika belum, Anda dapat menginstallnya dengan perintah berikut

   ```
   sudo apt-get install git
   ```

2. buka terminal, lalu jalankan perintah berikut

   ```
   git clone https://github.com/arashari/jawaban-fullsatck-take-home-test-gorrywell.git loketreservation
   ```

3. source code akan terdownload pada directory bernama `loketreservation`

### 3.b. via archive

1. buka link https://github.com/arashari/jawaban-fullsatck-take-home-test-gorrywell
2. klik tombol hijau bertuliskan "Code"
3. klik text bertuliskan "Download ZIP"
4. source code akan terdownload dalam bentuk archive zip
5. extract file archive tersebut
6. (opsional) ubah nama folder hasil extract menjadi nama yang lebih pendek (misalkan `loketreservation`)

## 4. menjalankan aplikasi

1. buka terminal dan pindah ke root folder dari source code yang sudah diclone, misalkan:

```
cd loketreservation
```

2. jalankan perintah berikut untuk menginstall dependency project

```
npm i # atau `yarn`
```

3. jika dependency sudah berhasil terinstall, jalankan aplikasi dengan menjalankan perintah berikut

```
npm run dev # atau `yarn dev`
```

_catatan: secara default, aplikasi akan berjalan pada port `3000`_

# limitation

lihat [ASSUMPTIONS.md](https://github.com/arashari/jawaban-fullsatck-take-home-test-gorrywell/blob/master/ASSUMPTIONS.md)

# TODO

- add unit test

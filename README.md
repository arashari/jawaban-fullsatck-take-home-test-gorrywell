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
  - [create location](#create-location)
    - [request](#request)
    - [response](#response)
  - [create event](#create-event)
    - [request](#request-1)
    - [response](#response-1)
  - [create event](#create-event-1)
    - [request](#request-2)
    - [response](#response-2)
  - [get event](#get-event)
    - [request](#request-3)
    - [response](#response-3)
  - [purchase ticket](#purchase-ticket)
    - [request](#request-4)
    - [response](#response-4)
  - [get transaction](#get-transaction)
    - [request](#request-5)
    - [response](#response-5)
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

| column     | type          | keterangan                   |
| ---------- | ------------- | ---------------------------- |
| id         | string        | PK                           |
| name       | string        |                              |
| startDate  | datetime      | YYYY-MM-DD HH:mm:ss          |
| endDate    | datetime      | YYYY-MM-DD HH:mm:ss          |
| locationId | string        | FK location                  |
| tickets    | array<Ticket> | jenis ticket pada event tsb. |

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

| column        | type                   | keterangan                                                |
| ------------- | ---------------------- | --------------------------------------------------------- |
| id            | string                 | PK                                                        |
| customerName  | string                 |                                                           |
| customerEmail | string                 |                                                           |
| event         | EventDetail            | snapshot data Event pada saat pembelian terjadi           |
| tickets       | array<PurchasedTicket> | array of snapshot data Ticket pada saat pembelian terjadi |

## EventDetail

| column    | type          | keterangan                   |
| --------- | ------------- | ---------------------------- |
| id        | string        | FK event                     |
| name      | string        |                              |
| startDate | datetime      | YYYY-MM-DD HH:mm:ss          |
| endDate   | datetime      | YYYY-MM-DD HH:mm:ss          |
| location  | Location      | snapshot data location       |
| tickets   | array<Ticket> | jenis ticket pada event tsb. |

## PurchasedTicket

| column   | type   | keterangan        |
| -------- | ------ | ----------------- |
| ticketId | string | FK ticket         |
| name     | string |                   |
| price    | int    |                   |
| quantity | int    |                   |
| total    | int    | price \* quantity |

# API spec

- response template

| field   | type   | keterangan             |
| ------- | ------ | ---------------------- |
| code    | int    | response code          |
| message | string | response message (raw) |
| data    | any    |                        |

- response code

| code | keterangan                                                              |
| ---- | ----------------------------------------------------------------------- |
| 200  | success                                                                 |
| 404  | data not found                                                          |
| 422  | validation error, misal karena kurang parameter required ketika request |
| 500  | server error, something wrong                                           |

## create location

- POST /location/create

### request

| field | type   | keterangan |
| ----- | ------ | ---------- |
| name  | string | required   |

### response

| field | type   | keterangan                  |
| ----- | ------ | --------------------------- |
| id    | string | newly generated location id |

## create event

- POST /event/create

### request

| field      | type   | keterangan                                                    |
| ---------- | ------ | ------------------------------------------------------------- |
| name       | string | required                                                      |
| locationId | string | required, valid location id (exists in db)                    |
| startDate  | string | required, format: YYYY-MM-DD HH:mm:ss, must be before endDate |
| endDate    | string | required, format: YYYY-MM-DD HH:mm:ss                         |

### response

| field | type   | keterangan               |
| ----- | ------ | ------------------------ |
| id    | string | newly generated event id |

## create event

- POST /event/ticket/create

### request

| field   | type   | keterangan                              |
| ------- | ------ | --------------------------------------- |
| name    | string | required                                |
| eventId | string | required, valid event id (exists in db) |
| quota   | int    | required, >= 0                          |
| price   | int    | required, > 0                           |

### response

| field | type   | keterangan                |
| ----- | ------ | ------------------------- |
| id    | string | newly generated ticket id |

## get event

- GET /event/get_info

### request

| field | type   | keterangan                              |
| ----- | ------ | --------------------------------------- |
| id    | string | required, valid event id (exists in db) |

### response

| field     | type          | keterangan                           |
| --------- | ------------- | ------------------------------------ |
| id        | string        |                                      |
| name      | string        |                                      |
| startDate | string        |                                      |
| endDate   | string        |                                      |
| tickets   | array<Ticket> | available ticket type for this event |
| location  | Location      |                                      |

- Ticket

| field        | type   | keterangan |
| ------------ | ------ | ---------- |
| id           | string |            |
| name         | string |            |
| quota        | int    |            |
| initialQuota | int    |            |
| price        | int    |            |

- Location

| field | type   | keterangan |
| ----- | ------ | ---------- |
| id    | string |            |
| name  | string |            |

## purchase ticket

- POST /transaction/purchase

### request

| field         | type                  | keterangan                              |
| ------------- | --------------------- | --------------------------------------- |
| customerName  | string                | required                                |
| customerEmail | string                | required                                |
| eventId       | string                | required, valid event id (exists in db) |
| tickets       | array<TicketPurchase> | required, cannot be an empty array      |

- TicketPurchase

| field    | type   | keterangan         |
| -------- | ------ | ------------------ |
| id       | string | required, ticketId |
| quantity | int    | required, > 0      |

### response

| field | type   | keterangan                |
| ----- | ------ | ------------------------- |
| id    | string | newly generated ticket id |

## get transaction

- GET /event/get_info

### request

| field | type   | keterangan                                    |
| ----- | ------ | --------------------------------------------- |
| id    | string | required, valid transaction id (exists in db) |

### response

| field         | type                   | keterangan                        |
| ------------- | ---------------------- | --------------------------------- |
| id            | string                 |                                   |
| customerName  | string                 |                                   |
| customerEmail | string                 |                                   |
| tickets       | array<PurchasedTicket> | snapshot data of purchased ticket |
| event         | Event                  | snapshot data of event            |

- PurchasedTicket

| field    | type   | keterangan        |
| -------- | ------ | ----------------- |
| ticketId | string |                   |
| name     | string |                   |
| price    | int    |                   |
| quantity | int    |                   |
| total    | int    | price \* quantity |

- Event

| field     | type     | keterangan |
| --------- | -------- | ---------- |
| id        | string   |            |
| name      | string   |            |
| startDate | string   |            |
| endDate   | string   |            |
| location  | Location |            |

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

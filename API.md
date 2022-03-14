- [general](#general)

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

## general

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

- sending data
  - GET -> query param
  - POST -> body (JSON)

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

| field   | type   | keterangan                |
| ------- | ------ | ------------------------- |
| id      | string | newly generated ticket id |
| eventId | string |                           |

## get event

- GET /event/get_info

### request

| field | type   | keterangan                              |
| ----- | ------ | --------------------------------------- |
| id    | string | required, valid event id (exists in db) |

### response

| field     | type            | keterangan                           |
| --------- | --------------- | ------------------------------------ |
| id        | string          |                                      |
| name      | string          |                                      |
| startDate | string          |                                      |
| endDate   | string          |                                      |
| tickets   | array of Ticket | available ticket type for this event |
| location  | Location        |                                      |

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

| field         | type                    | keterangan                              |
| ------------- | ----------------------- | --------------------------------------- |
| customerName  | string                  | required                                |
| customerEmail | string                  | required                                |
| eventId       | string                  | required, valid event id (exists in db) |
| tickets       | array of TicketPurchase | required, cannot be an empty array      |

- TicketPurchase

| field    | type   | keterangan         |
| -------- | ------ | ------------------ |
| id       | string | required, ticketId |
| quantity | int    | required, > 0      |

### response

| field | type   | keterangan                     |
| ----- | ------ | ------------------------------ |
| id    | string | newly generated transaction id |

## get transaction

- GET /event/get_info

### request

| field | type   | keterangan                                    |
| ----- | ------ | --------------------------------------------- |
| id    | string | required, valid transaction id (exists in db) |

### response

| field         | type                     | keterangan                        |
| ------------- | ------------------------ | --------------------------------- |
| id            | string                   |                                   |
| customerName  | string                   |                                   |
| customerEmail | string                   |                                   |
| tickets       | array of PurchasedTicket | snapshot data of purchased ticket |
| event         | Event                    | snapshot data of event            |

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

# Simple CMS

Build my own `simple CMS` using mongoose and express to pass Final live coding in phase 2! :+1:

## API Routes
<hr>

### Users

| Routes              | Method  | Description  
| --------------------|---------| ---------------
| `/api/users`        | POST    | Create new user
| `/api/users/login`  | POST    | User
| `/api/users`        | GET     | Get all user
| `/api/users/:id`    | DELETE  | Delete a user


### Datas

| Routes                  | Method  | Description  
| ----------------------- |---------| ---------------
| `/api/datas`            | GET     | Get all datas
| `/api/datas`            | POST    | Create a data
| `/api/datas/:id`        | PUT     | Update data
| `/api/datas/:id`        | DELETE  | Delete a data
| `/api/datas/search`     | GET     | Search a data by letter or frequency using req.query
| `/api/datas/searchAll`  | GET     | Search a data by letter and frequency using req.query

### Data Dates

| Routes                      | Method  | Description  
| --------------------------- |---------| ---------------
| `/api/datadates`            | GET     | Get all data dates
| `/api/datadates`            | POST    | Create a data date
| `/api/datadates/:id`        | PUT     | Update data date
| `/api/datadates/:id`        | DELETE  | Delete a data date
| `/api/datadates/search`     | GET     | Search a data date by letter or frequency using req.query
| `/api/datadates/searchAll`  | GET     | Search a data date by letter and frequency using req.query

## Schema Collections
<hr>

### Users

| Field       | DataType | Description  
| ------------|--------- | ---------------
| `username`  | `STRING` | -
| `password`  | `STRING` | -


### Datas

| Field       | DataType | Description  
| ------------|--------- | ---------------
| `letter`    | `STRING` | -
| `frequency` | `NUMBER` | -

### Data Dates

| Field       | DataType | Description  
| ------------|--------- | ---------------
| `date`      | `STRING` | date
| `frequency` | `NUMBER` | -

<br>

```
npm i
cd simple-cms/client -> live-server
```

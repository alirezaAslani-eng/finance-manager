# Transaction APIs

## To Create
### **_url & method -------------------------------------->_**
`api/transactions` & `POST`
### **_header -------------------------------->_**
```json
{ "Content-Type": "application/json" }
```
### **_body ------------------------------------>_**
```json
{ "amount":0, "reason":"", "type":"0 / 1", "account":"accountID", "category":"categoryID" }
```
## To Delete
### **_url & method -------------------------------------->_**
`api/transactions/:id` & `DELETE`
## To Edit
### **_url & method -------------------------------------->_**
`api/transactions/:id` & `PUT`
### **_header -------------------------------->_**
```json
{ "Content-Type": "application/json" }
```
### **_body ------------------------------------>_**
```json
{ "amount":0, "reason":"", "type":"0 / 1", "account":"accountID", "category":"categoryID" }
```
## To Get One TransactionInfo
### **_url & method -------------------------------------->_**
`api/transactions/:id` & `GET`


# Account APIs

## To Create

### **_url & method -------------------------------------->_**

`api/accounts` & `POST`

### **_header -------------------------------->_**

```json
{ "Content-Type": "application/json" }
```

### **_body ------------------------------------>_**

```json
{ "cardNumber": "xxxx-xxxx-xxxx-xxxx", "currentBalance": 0, "accountName": "" }
```

## To Delete

### **_url & method -------------------------------------->_**

`api/accounts/:id` & `DELETE`

## To Edit

### **_url & method -------------------------------------->_**

`api/accounts/:id` & `PUT`

### **_header -------------------------------->_**

```json
{ "Content-Type": "application/json" }
```

### **_body ------------------------------------>_**

```json
{ "cardNumber": "xxxx-xxxx-xxxx-xxxx", "currentBalance": 0, "accountName": "" }
```

# Auth APIs

## To SignUp
### ***url & method -------------------------------------->***
`api/users/auth/signup` & `POST`
### ***header -------------------------------->***
```json
{ "Content-Type": "application/json" }
```
### ***body ------------------------------------>***
```json
{ "userName": "", "fullName": "", "password": "", "phone": "", "email": "" }
```
## To SignIn
### ***url & method -------------------------------------->***
`api/users/auth/signin` & `GET`
### ***header -------------------------------->***
```json
{ "Content-Type": "application/json" }
```
### ***body ------------------------------------>***
```json
{ "identifier": "username or email", "password": "" }
```
## To Get UserInfo / getMe
### ***url & method -------------------------------------->***
`api/users/auth/me` & `GET`
## To SignOut
### ***url & method -------------------------------------->***
`api/users/auth/signout` & `GET`

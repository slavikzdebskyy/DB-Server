# Server for Data Base (Mongo DB, NodeJS, QraphQL)

## API list:

API URL  | Request type | Response Status | Response Body | Response Status | Response Body |
------------- | :-------------: | :-------------: | ------------- | :-------------: | -----------
`http://YOUR_HOST/administrators/login-admin` | POST | 200 |`{"token": String, "status": true, "admin": Object}` | 401 | `{"status": false, "msg": String}`
 `http://YOUR_HOST/administrators/restore-password` | POST | 200 | `{"status": true, "msg": String}` | 400 | `{"status": false, "msg": String}`
  * |
  `http://YOUR_HOST/test/test` | GET




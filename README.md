# Server for Data Base (Mongo DB, NodeJS, QraphQL)

## API list:

API URL  | Request type | Request body | Response Status | Response Body | Response Status | Response Body |
------------- | :-------------: |:-------------: | :-------------: | ------------- | :-------------: | -----------
`http://YOUR_HOST/administrators/login-admin` | POST | `{"email": String, "password": String}` | 200 |`{"token": String, "status": true, "admin": Object}` | 401 | `{"status": false, "msg": String}`
 `http://YOUR_HOST/administrators/restore-password` | POST | `{"email": String}` | 200 | `{"status": true, "msg": String}` | 404 / 409 | `{"status": false, error: "error" "msg": String}`
  `http://YOUR_HOST/administrators/check-security-code` | POST | `{"email": String, "code": String}` | 200 | `{"status": true, "msg": String}` | 403 / 409 | `{"status": false, error: "error" "msg": String}`
  `http://YOUR_HOST/administrators/change-password` | PATCH | `{"email": String, "password": String, "passwordConfirm": String}` | 200 | `{"status": true, "msg": String}` | 403 / 409 | `{"status": false, error: "error" "msg": String}`
  `http://YOUR_HOST/images/add-avatar-admin` | POST | `{"file": File.jpeg/png, "email": String}` | 200 | `{"status": true, "file": Object, "admin": Object}` | 400 / 404 |`{ "status": false, "error": Object/String }`
  `http://YOUR_HOST/images/all-images` | GET | - | 200 | `[Object]` | 400 | `{"error": String}`
  `http://YOUR_HOST/images/remove-image/:id` | DELETE | `:params : String` |200 | `{ msg: String }` | 404 | `{"error": String}`
  * |
  * |
  `http://YOUR_HOST/test/test` | GET




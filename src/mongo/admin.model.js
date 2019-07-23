import mongoose from 'mongoose';
import { adminModelName } from '../constans';

export default mongoose.model(adminModelName, {
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  nickName: {type: String, require: true},
  email: {type: String, require: true},
  avatar: {type: String},
  password: {type: String, require: true},
  permission: {type: Number, require: true}
});


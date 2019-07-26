import mongoose from 'mongoose';
import { MODEL_NAMES } from '../constants';

export default mongoose.model(MODEL_NAMES.adminModelName, {
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  nickName: {type: String, require: true},
  email: {type: String, require: true},
  avatar: {type: String},
  password: {type: String, require: true},
  permission: {type: Number, require: true},
  securityCode: {type: String},
});


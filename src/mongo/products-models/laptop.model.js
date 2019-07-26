import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constans';

export default mongoose.model(MODEL_NAMES.laptopModelName, {
  brand: {type: String, require: true},
  color: {type: String, require: true},
  condition: {type: String, require: true},
  guarantee: {type: String, require: true},
  monitorSize: {type: Number, require: true},
  monitorResolution: {type: String, require: true},
  colorType: {type: String, require: true},
  monitorType: {type: String, require: true},
  processor: {type: String, require: true},
  coreAmount: {type: Number, require: true},
  memoryRamType: {type: String, require: true},
  memoryRamAmount: {type: Number, require: true},
  videoType: {type: String, require: true},
  videoMemoryAmount: {type: Number, require: true},
  video: {type: String, require: true},
  driveType: {type: String, require: true},
  driveMemoryAmount: {type: String, require: true},
  options: {type: String, require: true},
  description: {type: String, require: true},
  images: {type: String, require: true},
  status: {type: String, require: true},
  seo: {type: String, require: true},
});



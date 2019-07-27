import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constants';

export default mongoose.model(MODEL_NAMES.monitor, {
  brand: {type: String, require: true},
  monitorType: {type: String, require: true},  
  monitorResolution: {type: String, require: true},
  monitorSize: {type: Number, require: true},
  contrast: {type: Number, require: true},
  brightness: {type: Number, require: true},
  light: {type: String, require: true},
  connectors: {type: String, require: true},  
  options: {type: String, require: true},
  description: {type: String, require: true},
  images: {type: [String], require: true},
  buyStatus: {type: String, require: true},
  payStatus: {type: Boolean },
  loacation: {type: String },
  seo: {type: String },
});


// Виробник
// тип матриці
// роширення
// діагональ
// контрасність
// яскравість
// підсвідка
// входи
// периферія
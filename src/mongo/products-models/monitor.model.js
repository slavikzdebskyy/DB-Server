import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constants';

export default mongoose.model(MODEL_NAMES.monitor, {
  _id: mongoose.Schema.Types.ObjectId,
  barCode: {type: String, require: true},
  brand: {type: String, require: true},
  monitorType: {type: String, require: true},  
  monitorResolution: {type: String, require: true},
  monitorSize: {type: Number, require: true},
  contrast: {type: Number},
  brightness: {type: Number},
  light: {type: String, require: true},
  connectors: {type: String, require: true},  
  options: {type: String, require: true},
  description: {type: String, require: true},
  images: {type: [Object]},
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
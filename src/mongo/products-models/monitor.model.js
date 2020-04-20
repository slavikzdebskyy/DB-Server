import mongoose from 'mongoose';
import { MODEL_NAMES, TYPE_NAMES } from '../../constants';

export default mongoose.model(MODEL_NAMES.monitor, {
  _id: mongoose.Schema.Types.ObjectId,
  barCode: {type: String, require: true},
  brand: {type: String, require: true},
  name: {type: String, require: true},
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
  imageHead: {type: Object},
  buyStatus: {type: String, require: true},
  payStatus: {type: Boolean },
  loacation: {type: String },
  seo: {type: String },  
  createdAt: {type: String, require: true},
  updatedAt: {type: String, require: true},
  price: {type: Number, require: true},
  isInStock: {type: Boolean, require: true},
  discount: {type: Number, require: true},
  quantity: {type: Number, require: true},
  productType: {type: String, default: TYPE_NAMES.monitor },
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
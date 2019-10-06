import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constants';

export default mongoose.model(MODEL_NAMES.laptopModelName, {
  _id: mongoose.Schema.Types.ObjectId,
  barCode: {type: String, require: true},
  brand: {type: String, require: true},
  type: {type: String, require: true},
  color: {type: String, require: true},
  condition: {type: String, require: true},
  guarantee: {type: Number, require: true},
  monitorSize: {type: Number, require: true},
  monitorResolution: {type: String, require: true}, // should be static
  monitorCoverType: {type: String, require: true}, // TODO: refactored type of cover
  monitorType: {type: String, require: true},
  processor: {type: String, require: true}, // name
  coreAmount: {type: Number, require: true},
  memoryRamAmount: {type: Number, require: true},
  memoryRamType: {type: String, require: true},
  videoType: {type: String, require: true},
  video: {type: String, require: true},   //name, brand
  videoMemoryAmount: {type: Number},
  driveMemoryAmount: {type: Number, require: true}, // TODO: if type is hybrid should be two memory amounts
  driveSecondMemoryAmount: {type: Number},
  driveType: {type: String, require: true},
  options: {type: String, require: true},
  description: {type: String, require: true},
  images: {type: [Object]},
  imageHead: {type: Object},
  buyStatus: {type: String, require: true},
  payStatus: {type: Boolean },
  loacation: {type: String },
  seo: {type: String },
});


// Виробник *
// тип  *
// колір  *
// стан   *
// гарантія (місяці)  *
// діагональ екрану *
// роширення екрану *
// тип покриття *
// тип матриці  *
// процесор *
// кількість ядер *
// обєм оперативної памяті  *
// тип оперативної памяті *
// тип відеокарти *
// відекарта  *
// обєм відеопамяті -
// обєм жосткого диску  *
// обєм 2го жосткого диску  -
// тип жосткого диску *
// периферія  *
// опис *
// фото *
// статус (в продажі, зарезервований, проданий) *
// статус оплати  -
// локація (на складі, на пошті ...)  *
// ключові слова для пошуку -

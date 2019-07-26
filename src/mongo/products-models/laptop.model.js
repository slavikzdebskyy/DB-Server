import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constans';

export default mongoose.model(MODEL_NAMES.laptopModelName, {
  brand: {type: String, require: true},
  type: {type: String, require: true},
  color: {type: String, require: true},
  condition: {type: String, require: true},
  guarantee: {type: String, require: true},
  monitorSize: {type: Number, require: true},
  monitorResolution: {type: String, require: true},
  colorType: {type: String, require: true},
  monitorType: {type: String, require: true},
  processor: {type: String, require: true},
  coreAmount: {type: Number, require: true},
  memoryRamAmount: {type: Number, require: true},
  memoryRamType: {type: String, require: true},
  videoType: {type: String, require: true},
  video: {type: String, require: true},
  videoMemoryAmount: {type: Number, require: true},
  driveMemoryAmount: {type: String, require: true},
  driveType: {type: String, require: true},
  options: {type: String, require: true},
  description: {type: String, require: true},
  images: {type: String, require: true},
  buyStatus: {type: String, require: true},
  payStatus: {type: Boolean },
  loacation: {type: String },
  seo: {type: String },
});


// Виробник,
// тип,
// колір,
// стан,
// гарантія,
// діагональ екрану, 
// роширення екрану, 
// тип покриття, 
// тип матриці.  
// процесор, 
// кількість ядер, 
// обєм оперативної памяті, 
// тип оперативної памяті, 
// тип відеокарти, 
// відекарта, 
// обєм відеопамяті, 
// обєм жосткого диску, 
// тип жосткого диску, 
// периферія
// опис
// фото
// статус (в продажі, зарезервований, проданий)
// статус оплати 
// локація
// улючові слова для пошуку
import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constants';

export default mongoose.model(MODEL_NAMES.pc, {
  brand: {type: String, require: true},
  type: {type: String, require: true},
  condition: {type: String, require: true},
  guarantee: {type: String, require: true},
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


// Виробник
// тип корпуса
// стан
// гарантія
// процесор
// кількість ядер
// обєм оперативної памяті
// тип оперативної памяті
// тип відеокарти
// відеокарта
// обєм відеопамяті
// обєм жосткого диску
// тип жосткого диску
// периферія
// опис
// фото
// статус (в продажі, зарезервований, проданий)
// статус оплати 
// локація
// ключові слова для пошуку

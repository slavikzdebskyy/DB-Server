import mongoose from 'mongoose';
import { MODEL_NAMES } from '../../constants';

export default mongoose.model(MODEL_NAMES.pc, {
  _id: mongoose.Schema.Types.ObjectId,
  barCode: {type: String, require: true},
  brand: {type: String, require: true},
  type: {type: String, require: true},
  color: {type: String, require: true},
  condition: {type: String, require: true},
  guarantee: {type: Number, require: true},  
  processor: {type: String, require: true},
  coreAmount: {type: Number, require: true},
  memoryRamAmount: {type: Number, require: true},
  memoryRamType: {type: String, require: true},
  videoType: {type: String, require: true},
  video: {type: String, require: true},
  videoMemoryAmount: {type: Number},
  driveMemoryAmount: {type: Number, require: true},
  driveSecondMemoryAmount: {type: Number},
  driveType: {type: String, require: true},
  driveSecondType: {type: String },
  options: {type: String, require: true},
  description: {type: String, require: true},
  images: {type: [Object]},
  imageHead: {type: Object},
  buyStatus: {type: String, require: true},
  payStatus: {type: Boolean },
  loacation: {type: String },
  seo: {type: String },
  productType: {type: String, require: true},
  createdAt: {type: String, require: true},
  updatedAt: {type: String, require: true},
  price: {type: Number, require: true},
  isInStock: {type: Boolean, require: true},
  discount: {type: Number, require: true},
  quantity: {type: Number, require: true},

});

  // barCode => Штрих-код
  // brand => Виробник
  // type => тип корпуса
  // condition => стан
  // guarantee => гарантія
  // processor => процессор
  // coreAmount => кількість ядер
  // memoryRamAmount => обєм оперативної памяті
  // memoryRamType => тип оперативної памяті
  // videoType => тип відеокарти
  // video => відеокарта
  // videoMemoryAmount => обємвідеопамяті
  // driveMemoryAmount => обєм жосткого диску
  // driveSecondMemoryAmount => обєм 2го жосткого диску
  // driveType => тип жосткого диску
  // driveSecondType => тип 2го жосткого диску
  // options => периферія
  // description => опис
  // images => фото
  // buyStatus => статус (в продажі, зарезервований, проданий)
  // payStatus => статус оплати
  // loacation => локація
  // seo => ключові слова для пошуку

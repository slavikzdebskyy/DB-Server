import { MonitorType, monitorMutationFields } from '../types/product-types/monitor.type';
import { LaptopType, laptopMutationFields } from '../types/product-types/laptop.type';
import { PCType, pcMutationFields } from '../types/product-types/ps.type';
import Monitor from '../../mongo/products-models/monitor.model';
import Laptop from '../../mongo/products-models/laptop.model';
import PC from '../../mongo/products-models/pc-model';
import mongoose from 'mongoose';

export const addLaptop = {
  type: LaptopType,
  args: laptopMutationFields,
  resolve: (root, args, context, info) => {
    const params = Object.assign({_id: mongoose.Types.ObjectId()}, args);
    const laptop = new Laptop(params);
    return laptop.save();
  }
}

export const addPC = {
  type: PCType,
  args: pcMutationFields,
  resolve: (root, args, context, info) => {
    const params = Object.assign({_id: mongoose.Types.ObjectId()}, args);
    params.images = JSON.parse(JSON.stringify(params.images));
    const pc = new PC(params);
    return pc.save();
  }
}

export const addMonitor = {
  type: MonitorType,
  args: monitorMutationFields,
  resolve: (root, args, context, info) => {
    const params = Object.assign({_id: mongoose.Types.ObjectId()}, args);
    const monitor = new Monitor(params);
    return monitor.save();
  }
}

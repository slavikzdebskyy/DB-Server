
import PC from '../../mongo/products-models/pc-model';
import * as graphql from 'graphql';
import { LaptopType } from '../types/product-types/laptop.type';
import { PCType } from '../types/product-types/ps.type';
import { MonitorType } from '../types/product-types/monitor.type';
import Monitor from '../../mongo/products-models/monitor.model';
import Laptop from '../../mongo/products-models/laptop.model';


export const addLaptop = {
  type: LaptopType,
  args: {
    brand: { type: graphql.GraphQLString },    
    type: { type: graphql.GraphQLString },
    color: { type: graphql.GraphQLString },
    condition: { type: graphql.GraphQLString },
    guarantee: { type: graphql.GraphQLString },
    monitorSize: { type: graphql.GraphQLInt },
    monitorResolution: { type: graphql.GraphQLString },
    colorType: { type: graphql.GraphQLString },
    monitorType: { type: graphql.GraphQLString },
    processor: { type: graphql.GraphQLString },
    coreAmount: { type: graphql.GraphQLInt },
    memoryRamType: { type: graphql.GraphQLString },
    memoryRamAmount: { type: graphql.GraphQLInt },
    videoType: { type: graphql.GraphQLString },
    videoMemoryAmount: { type: graphql.GraphQLInt },
    video: { type: graphql.GraphQLString },
    driveType: { type: graphql.GraphQLString },
    driveMemoryAmount: { type: graphql.GraphQLString },
    options: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    images: { type: graphql.GraphQLString },
    buyStatus: { type: graphql.GraphQLString },
    payStatus: { type: graphql.GraphQLBoolean },
    loacation: { type: graphql.GraphQLString },
    seo: { type: graphql.GraphQLString },
  },
  resolve: (root, args, context, info) => {
    const params = Object.assign({}, args);
    const laptop = new Laptop(params);
    return laptop.save();
  }
}

export const addPC = {
  type: PCType,
  args: {
    brand: { type: graphql.GraphQLString },
    type: { type: graphql.GraphQLString },
    condition: { type: graphql.GraphQLString },
    guarantee: { type: graphql.GraphQLString },
    processor: { type: graphql.GraphQLString },
    coreAmount: { type: graphql.GraphQLInt },
    memoryRamAmount: { type: graphql.GraphQLInt },
    memoryRamType: { type: graphql.GraphQLString },
    videoType: { type: graphql.GraphQLString },
    video: { type: graphql.GraphQLString },
    videoMemoryAmount: { type: graphql.GraphQLInt },
    driveMemoryAmount: { type: graphql.GraphQLString },
    driveType: { type: graphql.GraphQLString },
    options: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    images: { type: graphql.GraphQLString },
    buyStatus: { type: graphql.GraphQLString },
    payStatus: { type: graphql.GraphQLBoolean },
    loacation: { type: graphql.GraphQLString },
    seo: { type: graphql.GraphQLString },
  },
  resolve: (root, args, context, info) => {
    const params = Object.assign({}, args);
    const pc = new PC(params);
    return pc.save();
  }
}

export const addMonitor = {
  type: MonitorType,
  args: {
    brand: { type: graphql.GraphQLString },
    monitorType: { type: graphql.GraphQLString },  
    monitorResolution: { type: graphql.GraphQLString },
    monitorSize: { type: graphql.GraphQLInt },
    contrast: { type: graphql.GraphQLString },
    brightness: { type: graphql.GraphQLString },
    light: { type: graphql.GraphQLString },
    connectors: { type: graphql.GraphQLString },  
    options: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    images: { type: graphql.GraphQLList(graphql.GraphQLString) },
    buyStatus: { type: graphql.GraphQLString },
    payStatus: { type: graphql.GraphQLBoolean },
    loacation: { type: graphql.GraphQLString },
    seo: { type: graphql.GraphQLString },
  },
  resolve: (root, args, context, info) => {
    const params = Object.assign({}, args);
    const monitor = new Monitor(params);
    return monitor.save();
  }
}
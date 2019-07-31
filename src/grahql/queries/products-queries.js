import * as graphql from 'graphql';
import { LaptopType } from '../types/product-types/laptop.type';
import { PCType } from '../types/product-types/ps.type';
import { MonitorType } from '../types/product-types/monitor.type';
import Laptop from '../../mongo/products-models/laptop.model';
import PC from '../../mongo/products-models/pc-model';
import Monitor from '../../mongo/products-models/monitor.model';

export const getAllLaptops = {
  type: graphql.GraphQLList(LaptopType),
  resolve: (root, args, context, info) => {
    return Laptop.find({}).exec();
  }
}

export const getAllPCs = {
  type: graphql.GraphQLList(PCType),
  resolve: (root, args, context, info) => {
    return PC.find({}).exec();
  }
}

export const getAllMonitors = {
  type: graphql.GraphQLList(MonitorType),
  resolve: (root, args, context, info) => {
    return Monitor.find({}).exec();
  }
}

import * as graphql from 'graphql';
import { LaptopType } from '../types/product-types/laptop.type';
import Laptop from '../../mongo/products-models/laptop.model';

export const getAllLaptops = {
  type: graphql.GraphQLList(LaptopType),
  resolve: (root, args, context, info) => {
    return Laptop.find({}).exec();
  }
}


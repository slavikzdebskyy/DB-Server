import bcrypt from 'bcrypt';
import { saltRounds } from '../../constans';
import Laptop from '../../mongo/products-models/laptop.model';
import * as graphql from 'graphql';
import { LaptopType } from '../types/product-types/laptop.type';
import { MESSAGES } from '../../constans';


export const addLaptop = {
  type: LaptopType,
  args: {
    brand: { type: graphql.GraphQLString },
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
    status: { type: graphql.GraphQLString },
    seo: { type: graphql.GraphQLString },
  },
  resolve: (root, args, context, info) => {
    const params = Object.assign({}, args);
    // return bcrypt.hash(params.password, saltRounds)
    //   .then(hash => Admin.findOne({'email': params.email})
    //     .exec()
    //     .then(res => {
    //       if (res) {
    //         throw new Error(MESSAGES.admin_exist);
    //       }
    //       params.password = hash;
    //       const country = new Admin(params);
    //       return country.save();
    //     })          
    // );   
    const laptop = new Laptop(params);
    return laptop.save();
  }
}
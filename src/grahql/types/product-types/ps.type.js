import * as graphql from 'graphql';

import { productImageType, productImageInputType } from './product-image.type';
import { TYPE_NAMES } from '../../../constants';

const fields = {
  id: { type: graphql.GraphQLString }, 
  barCode: { type: graphql.GraphQLString },
  brand: { type: graphql.GraphQLString },    
  type: { type: graphql.GraphQLString },
  color: { type: graphql.GraphQLString },
  condition: { type: graphql.GraphQLString },
  guarantee: { type: graphql.GraphQLInt },
  processor: { type: graphql.GraphQLString },
  coreAmount: { type: graphql.GraphQLInt },
  memoryRamType: { type: graphql.GraphQLString },
  memoryRamAmount: { type: graphql.GraphQLInt },
  videoType: { type: graphql.GraphQLString },
  videoMemoryAmount: { type: graphql.GraphQLInt  },
  video: { type: graphql.GraphQLString },
  driveType: { type: graphql.GraphQLString },
  driveMemoryAmount: { type: graphql.GraphQLInt },
  driveSecondMemoryAmount: { type: graphql.GraphQLInt },
  driveSecondType: { type: graphql.GraphQLString },
  options: { type: graphql.GraphQLString },
  description: { type: graphql.GraphQLString },  
  buyStatus: { type: graphql.GraphQLString },
  payStatus: { type: graphql.GraphQLBoolean },
  loacation: { type: graphql.GraphQLString },
  seo: { type: graphql.GraphQLString },
  productType: { type: graphql.GraphQLString },
  createdAt: { type: graphql.GraphQLString },
  updatedAt: { type: graphql.GraphQLString },
  price: { type: graphql.GraphQLInt },
  isInStock: { type: graphql.GraphQLBoolean },
  discount: { type: graphql.GraphQLInt },
  quantity: { type: graphql.GraphQLInt }, 
};

export const pcFields = Object.assign(
  {
    images: { type: graphql.GraphQLList(productImageType) },
    imageHead: { type: productImageType },
  }, fields
);
export const pcMutationFields = Object.assign(
  {
    images: { type: new graphql.GraphQLList(productImageInputType) },
    imageHead: { type: productImageInputType },
  }, fields
);

const type = {
  name: TYPE_NAMES.pc,
  fields: pcFields,
};

export const PCType = new graphql.GraphQLObjectType(type);
import * as graphql from 'graphql';

import { productImageType, productImageInputType } from './product-image.type';
import { TYPE_NAMES } from '../../../constants';

const fields = {
  id: { type: graphql.GraphQLString }, 
  barCode: { type: graphql.GraphQLString },
  brand: { type: graphql.GraphQLString },
  monitorType: { type: graphql.GraphQLString },  
  monitorResolution: { type: graphql.GraphQLString },
  monitorSize: { type: graphql.GraphQLInt },
  contrast: { type: graphql.GraphQLInt },
  brightness: { type: graphql.GraphQLInt },
  light: { type: graphql.GraphQLString },
  connectors: { type: graphql.GraphQLString },  
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

export const monitorFields = Object.assign(
  {
      images: { type: graphql.GraphQLList(productImageType) },
      imageHead: { type: productImageType },
  }, fields
);
export const monitorMutationFields = Object.assign(
  {
    images: { type: new graphql.GraphQLList(productImageInputType) },
    imageHead: { type: productImageInputType },
  }, fields
);

const type = {
  name: TYPE_NAMES.monitor,
  fields: monitorFields,
};

export const MonitorType = new graphql.GraphQLObjectType(type);
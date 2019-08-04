import * as graphql from 'graphql';
import { productImageType } from './product-image.type';
import { TYPE_NAMES } from '../../../constants';

export const monitorFields = {
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
  images: { type: graphql.GraphQLList(productImageType) },
  buyStatus: { type: graphql.GraphQLString },
  payStatus: { type: graphql.GraphQLBoolean },
  loacation: { type: graphql.GraphQLString },
  seo: { type: graphql.GraphQLString },
};

const type = {
  name: TYPE_NAMES.monitor,
  fields: monitorFields,
};

export const MonitorType = new graphql.GraphQLObjectType(type);
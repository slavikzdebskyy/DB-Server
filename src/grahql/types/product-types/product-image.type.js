import * as graphql from 'graphql';
import { TYPE_NAMES } from '../../../constants';

export const productImageFields = {
  id: { type: graphql.GraphQLString }, 
  name: { type: graphql.GraphQLString },
  path: { type: graphql.GraphQLString },
};

const type = {
  name: TYPE_NAMES.productImage,
  fields: productImageFields,
};

const typeInput = {
  name: TYPE_NAMES.productInputImage,
  fields: productImageFields,
};

export const productImageType = new graphql.GraphQLObjectType(type);
export const productImageInputType = new graphql.GraphQLInputObjectType(typeInput);

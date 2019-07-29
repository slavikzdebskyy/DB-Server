import * as graphql from 'graphql';
import { TYPE_NAMES } from '../../../constants';

export const laptopFields = {
  barCode: { type: graphql.GraphQLString },    
  brand: { type: graphql.GraphQLString },    
  type: { type: graphql.GraphQLString },
  color: { type: graphql.GraphQLString },
  condition: { type: graphql.GraphQLString },
  guarantee: { type: graphql.GraphQLInt },
  monitorSize: { type: graphql.GraphQLInt },
  monitorResolution: { type: graphql.GraphQLString },
  monitorCoverType: { type: graphql.GraphQLString },
  monitorType: { type: graphql.GraphQLString },
  processor: { type: graphql.GraphQLString },
  coreAmount: { type: graphql.GraphQLInt },
  memoryRamType: { type: graphql.GraphQLString },
  memoryRamAmount: { type: graphql.GraphQLInt },
  videoType: { type: graphql.GraphQLString },
  videoMemoryAmount: { type: graphql.GraphQLInt },
  video: { type: graphql.GraphQLString },
  driveType: { type: graphql.GraphQLString },
  driveMemoryAmount: { type: graphql.GraphQLInt },
  driveSecondMemoryAmount: { type: graphql.GraphQLInt },
  options: { type: graphql.GraphQLString },
  description: { type: graphql.GraphQLString },
  images: { type: graphql.GraphQLList(graphql.GraphQLString) },
  buyStatus: { type: graphql.GraphQLString },
  payStatus: { type: graphql.GraphQLBoolean },
  loacation: { type: graphql.GraphQLString },
  seo: { type: graphql.GraphQLString },
};

const type = {
  name: TYPE_NAMES.laptop,
  fields: laptopFields,
};

export const LaptopType = new graphql.GraphQLObjectType(type);


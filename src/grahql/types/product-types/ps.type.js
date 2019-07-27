import * as graphql from 'graphql';

export const PCType = new graphql.GraphQLObjectType({
  name: 'PC',
  fields: {
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
  }
});
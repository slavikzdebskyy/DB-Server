import * as graphql from 'graphql';

export const LaptopType = new graphql.GraphQLObjectType({
  name: 'Laptop',
  fields: {
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
  }
});
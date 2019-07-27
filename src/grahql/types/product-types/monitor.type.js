import * as graphql from 'graphql';

export const MonitorType = new graphql.GraphQLObjectType({
  name: 'Monitor',
  fields: {
    brand: { type: graphql.GraphQLString },
    monitorType: { type: graphql.GraphQLString },  
    monitorResolution: { type: graphql.GraphQLString },
    monitorSize: { type: graphql.GraphQLInt },
    contrast: { type: graphql.GraphQLString },
    brightness: { type: graphql.GraphQLString },
    light: { type: graphql.GraphQLString },
    connectors: { type: graphql.GraphQLString },  
    options: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    images: { type: graphql.GraphQLList(graphql.GraphQLString) },
    buyStatus: { type: graphql.GraphQLString },
    payStatus: { type: graphql.GraphQLBoolean },
    loacation: { type: graphql.GraphQLString },
    seo: { type: graphql.GraphQLString },
  }
});
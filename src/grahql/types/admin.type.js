import * as graphql from 'graphql';

export const AdministratorType = new graphql.GraphQLObjectType({
  name: 'Administrator',
  fields: {
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    nickName: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    avatar: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    permission: { type: graphql.GraphQLInt },
    tokens: { type: new graphql.GraphQLList(graphql.GraphQLString) },
  }
});
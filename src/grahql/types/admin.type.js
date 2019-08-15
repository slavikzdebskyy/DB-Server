import * as graphql from 'graphql';

export const AdministratorType = new graphql.GraphQLObjectType({
  name: 'Administrator',
  fields: {
    id: { type: graphql.GraphQLString }, 
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    nickName: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    avatar: { type: graphql.GraphQLString },
    permission: { type: graphql.GraphQLInt },
    password: { type: graphql.GraphQLString },
  }
});
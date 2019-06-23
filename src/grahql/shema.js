import * as graphql from 'graphql';
import Admin from '../mongo/admin.model';
import { AdministratorType } from './types/admin.type';

const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllAdmins: {
      type: graphql.GraphQLList(AdministratorType),
      resolve: (root, args, context, info) => {
        return Admin.find({}).exec();
      }
    },
  }
});

const mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {      
    addAdmin: {
      type: AdministratorType,
      args: {
        firstName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        lastName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        nickName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        email: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        avatar: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        permission: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: (root, args, context, info) => {
          const country = new Admin(args);
          return country.save();
      }
    }
  }
})

export default new graphql.GraphQLSchema({
  query,
  mutation
});

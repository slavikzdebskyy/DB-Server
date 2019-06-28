import * as graphql from 'graphql';
import Admin from '../mongo/admin.model';
import { AdministratorType } from './types/admin.type';
import bcrypt from 'bcrypt';
import { saltRounds } from '../constans';

const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllAdmins: {
      type: graphql.GraphQLList(AdministratorType),
      resolve: (root, args, context, info) => {
        return Admin.find({}).exec();
      }
    },
    getAdminByEmail: {
      type: AdministratorType,
      args: {
        email: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: (root, args, context, info) => 
        Admin.findOne({'email': args.email}).exec()
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
        const params = Object.assign({}, args);
        return bcrypt.hash(params.password, saltRounds)
          .then(hash => Admin.findOne({'email': params.email})
            .exec()
            .then(res => {
              if (res) {
                throw new Error('Administrator with this email already exists');
              }
              params.password = hash;
              const country = new Admin(params);
              return country.save();
            })          
        );          
      }
    }
  }
});



export default new graphql.GraphQLSchema({
  query,
  mutation
});

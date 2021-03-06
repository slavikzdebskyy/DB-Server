import bcrypt from 'bcrypt';
import { saltRounds } from '../../constants';
import Admin from '../../mongo/admin.model';
import * as graphql from 'graphql';
import { AdministratorType } from '../types/admin.type';
import { MESSAGES } from '../../constants';


export const addAdmin = {
  type: AdministratorType,
  args: {
    firstName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    lastName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    nickName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    email: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    avatar: { type: graphql.GraphQLString },
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
            throw new Error(MESSAGES.admin_exist);
          }
          params.password = hash;
          const admin = new Admin(params);
          return admin.save();
        })          
    );          
  }
}
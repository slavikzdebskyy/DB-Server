import * as graphql from 'graphql';
import { AdministratorType } from '../types/admin.type';
import Admin from '../../mongo/admin.model';

export const getAllAdmins = {
  type: graphql.GraphQLList(AdministratorType),
  resolve: (root, args, context, info) => {
    return Admin.find({}).exec();
  }
}

export const getAdminByEmail = {
  type: AdministratorType,
  args: {
    email: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
  },
  resolve: (root, args, context, info) => 
    Admin.findOne({'email': args.email}).exec()
}
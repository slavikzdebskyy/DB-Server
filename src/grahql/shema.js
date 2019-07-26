import * as graphql from 'graphql';
import { addAdmin } from './mutations/admin-mutations';
import { getAllAdmins, getAdminByEmail } from './queries/admin-queries';



const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllAdmins,
    getAdminByEmail,
  }
});

const mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {      
    addAdmin,
  }
});

export default new graphql.GraphQLSchema({
  query,
  mutation
});

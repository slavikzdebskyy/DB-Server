import * as graphql from 'graphql';
import { addAdmin } from './mutations/admin-mutations';
import { getAllAdmins, getAdminByEmail } from './queries/admin-queries';
import { addLaptop } from './mutations/product-mutations';
import { getAllLaptops } from './queries/products-queries';


const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllAdmins,
    getAdminByEmail,
    getAllLaptops,
  }
});

const mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {      
    addAdmin,
    addLaptop,
  }
});

export default new graphql.GraphQLSchema({
  query,
  mutation
});

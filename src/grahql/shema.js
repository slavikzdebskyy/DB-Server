import * as graphql from 'graphql';
import { addAdmin } from './mutations/admin-mutations';
import { getAllAdmins, getAdminByEmail } from './queries/admin-queries';
import { addLaptop, addPC, addMonitor } from './mutations/product-mutations';
import { getAllLaptops, getAllPCs, getAllMonitors } from './queries/products-queries';


const query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllAdmins,
    getAdminByEmail,
    getAllLaptops,
    getAllPCs,
    getAllMonitors,
  }
});

const mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {      
    addAdmin,
    // addLaptop,
    // addPC,
    // addMonitor,
  }
});

export default new graphql.GraphQLSchema({
  query,
  mutation
});

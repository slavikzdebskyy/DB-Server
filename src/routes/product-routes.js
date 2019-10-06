import express from 'express';

import Laptop from '../mongo/products-models/laptop.model';
import Monitor from '../mongo/products-models/monitor.model';
import PC from '../mongo/products-models/pc-model';

import { ROUTES } from '../constants';

const productRoutes = express.Router();

/**
 * Get product by ID
 * @param {string} productId
 * @return {Product}
 */
productRoutes.get(`${ROUTES.PRODUCT.findOne}/:${ROUTES.PRODUCT.productId}`, (request, response) => { 
  const query = { _id: request.params[ROUTES.PRODUCT.productId] };
  const laptop = Laptop.findOne(query);
  const monitor = Monitor.findOne(query);
  const pc = PC.findOne(query);
  Promise.all([laptop, monitor, pc])
    .then((result) => {
      const product = result.find(el=> !!el);        
      return response.status(200).json({ status: true, product });
    })
    .catch((error) => response.status(400).json({ status: false, error }));  
});


export default productRoutes;
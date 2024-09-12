import {Router} from 'express';

import productsRoutes from '../../../../modules/products/infra/http/routes/products.routes';
import usersRoutes from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '../../../../modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '../../../../modules/users/infra/http/routes/password.routes';
import profileRoutes from '../../../../modules/users/infra/http/routes/profile.routes';
import customersRoutes from '../../../../modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '../../../../modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);       
routes.use('/password', passwordRoutes);   
routes.use('/profile', profileRoutes);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRouter);

export default routes;
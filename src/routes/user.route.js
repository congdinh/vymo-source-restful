import { Router } from 'express';
import { getUser, createUser } from '../controllers/user.controller';

const router = Router();

export default () => {
  /** GET /api/users - Get list of users */
  router.get('/', getUser);

  /** POST /api/users - Create new user */
  router.post('/', createUser);

  return router;
};

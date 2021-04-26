import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

// vamos criar um rota para alterar um único usuário, por isso estamos utilizando o patch
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar') /** nome do campo que vai conter essa imagem */,
  userAvatarController.update,
);
export default usersRouter;

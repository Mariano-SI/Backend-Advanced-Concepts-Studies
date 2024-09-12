import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserController from "../controller/UserController";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "../../../../../config/upload";
import UserAvatarController from "../controller/UserAvatarController";

const usersRoutes = Router();
const usersController = new UserController();
const updateAvatarControler = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRoutes.get("/", isAuthenticated,  usersController.index);
usersRoutes.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required()
        }
    }),  
    usersController.create);

usersRoutes.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    updateAvatarControler.update
);
export default usersRoutes;
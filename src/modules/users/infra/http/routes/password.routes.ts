import { Router } from "express";
import {celebrate, Joi, Segments} from "celebrate";
import ForgotPasswordController from "../controller/ForgotPasswordController";
import ResetPasswordController from "../controller/ResetPasswordController";

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post(
    "/forgot",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        }
    }),
    forgotPasswordController.create
);

passwordRoutes.post(
    "/reset",
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            newPassword: Joi.string().required(),
            passwordConfirmation: Joi.string().required().valid(Joi.ref('newPassword'))
        }
    }),
    resetPasswordController.create
);


export default passwordRoutes;
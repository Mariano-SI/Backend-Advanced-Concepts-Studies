import { Request, Response } from "express";
import ResetPasswordService from "../../../services/ResetPasswordService";

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { newPassword, token } = request.body;
    const resetPassoword = new ResetPasswordService();

    await resetPassoword.execute({newPassword, token});

    return response.status(204).json();
  }
}
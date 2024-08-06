import { Request, Response } from "express";
import ListUsersServices from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersServices();
    const users = await listUsers.execute();
    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, confirmPassword } = request.body;
    const createUser = new CreateUserService();

    const createdUser = await createUser.execute({name, email, password, confirmPassword});

    return response.status(201).json(createdUser);
  }
}
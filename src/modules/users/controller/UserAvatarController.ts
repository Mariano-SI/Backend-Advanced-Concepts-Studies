import { Request, Response } from "express";
import ListUsersServices from "../services/ListUsersService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.user;

    const updateUserAvatar = new UpdateUserAvatarService();
    const updatedUser = await updateUserAvatar.execute({
      userId: id, 
      avatarFilename: request.file.filename
    });

    return response.json(instanceToInstance(updatedUser));
  }

  
}
import { Request, Response } from "express";
import ListUsersServices from "../services/ListUsersService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {

    console.log(request.user.id)
    const {id} = request.user;

    const updateUserAvatar = new UpdateUserAvatarService();
    const updatedUser = await updateUserAvatar.execute({
      userId: id, 
      avatarFilename: request.file.filename
    });

    return response.json(updatedUser);
  }

  
}
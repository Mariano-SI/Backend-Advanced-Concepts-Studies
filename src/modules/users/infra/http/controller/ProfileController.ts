import { Request, Response } from "express";

import ShowProfileService from "../../../services/ShowProfileService";
import UpdateProfileService from "../../../services/UpdateProfileService";
import {instanceToInstance} from 'class-transformer';

export default class ProfileController{
    public async show(req: Request, res: Response): Promise<Response>{
        const showProfile = new ShowProfileService();

        const {id} = req.user;

        const user = await showProfile.execute({userId: id});

        return res.status(200).json(instanceToInstance(user));

    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {id} = request.user;
        const {name, email, password, oldPassword} = request.body;
        
        const updateProfile = new UpdateProfileService();
    
        const createdUser = await updateProfile.execute({
            userId: id, 
            name, 
            email, 
            password, 
            oldPassword
        });
    
        return response.status(200).json(instanceToInstance(createdUser));
      }
}
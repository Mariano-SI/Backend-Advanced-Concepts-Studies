import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from "../../../config/upload"
import DiskStorageProvider from "../../../shared/providers/StorageProvider/DiskStorageProvider";
import S3StorageProvider from "../../../shared/providers/StorageProvider/S3StorageProvider";
import fs from "fs";

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({userId, avatarFilename}: IRequest){
    const usersRepository = getCustomRepository(UsersRepository);
    
    const user = await usersRepository.findById(userId);
    
    if(!user){
      throw new AppError('User not found.', 404);
    }
    
    if(uploadConfig.driver === 's3'){

      const s3StorageProvider = new S3StorageProvider();

      if(user.avatar){
        await s3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await s3StorageProvider.saveFile(avatarFilename);

      user.avatar = fileName;

    }else{
      const storageProvider = new DiskStorageProvider();

      if(user.avatar){
        await storageProvider.deleteFile(user.avatar);
      }
  
      const fileName = await storageProvider.saveFile(avatarFilename);
      user.avatar = fileName;
    }


    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
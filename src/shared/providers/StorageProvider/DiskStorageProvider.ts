import fs from 'fs';
import path from 'path';
import uploadConfig from "../../../config/upload"

export default class DiskStorageProvider{
    public async saveFile(file: string): Promise<string>{
        console.log('Chegou aqui')
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.directory, file)
        );
        console.log('Chegou aqui 2')
        return file;
    }
    public async deleteFile(file: string): Promise<void>{
        const filePath = path.resolve(uploadConfig.directory, file);

        try{
            await fs.promises.stat(filePath);
        }catch(err){
            return;
        }

        await fs.promises.unlink(filePath);
    }
}
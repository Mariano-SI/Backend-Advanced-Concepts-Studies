import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";
import upload from "../../../../config/upload";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date


    @Expose({name: 'avatar_url'})
    getAvatarUrl(): string | null { 
        if(!this.avatar){ 
            return null         
        }         
        if(process.env.STORAGE_DRIVER === 'disk'){             
            return `${process.env.APP_API_URL}/files/${this.avatar}`
        }else{ 
            return `https://${upload.config.aws.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${this.avatar}`         
        }    
    }
}

export default User;
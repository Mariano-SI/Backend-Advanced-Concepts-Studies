import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";
import { IUserTokensRepository } from "../../../domain/repositories/IUserTokensRepository";

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> implements IUserTokensRepository{
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: { token : token }
        });

        return userToken;
    }

    public async generate(userId: string): Promise<UserToken> {
        const userToken = this.create({
            user_id: userId
        });

        await this.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
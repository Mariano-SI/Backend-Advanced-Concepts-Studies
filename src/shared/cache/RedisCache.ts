import Redis, { Redis as RedisClient } from 'ioredis';
import cache from '../../config/cache';

class RedisCache {
    private client: RedisClient;
    private connected = false;

    constructor() {
        if(!this.connected){
            this.client = new Redis(cache.config.redis);
            this.connected = true;
        }
    }

    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if(!data){
            return null;
        }
        const paserdData = JSON.parse(data) as T;
        return paserdData;
    } 

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}

export default new RedisCache();
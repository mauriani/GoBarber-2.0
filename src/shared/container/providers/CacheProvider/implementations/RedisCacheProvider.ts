import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    // salvando informação dentro do redis
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // busca todas as chaves
    const keys = await this.client.keys(`${prefix}:*`);

    // pipeline -> multipla operações ao memos tempo

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.provider';
import { REDIS_CLIENT_NAME } from './redis.constants';

@Injectable()
export class RedisService {
  public constructor(
    @Inject(REDIS_CLIENT_NAME)
    private readonly client: RedisClient,
  ) {}

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, expirationSeconds?: number) {
    await this.client.setWithTTL(key, value, expirationSeconds);
  }
}

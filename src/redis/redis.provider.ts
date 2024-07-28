import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT_NAME } from './redis.constants';

export type RedisClient = Redis & {
  setWithTTL: (key: string, value: string, ttl?: number) => Promise<string>;
};

export const RedisProvider: Provider = {
  useFactory: async (): Promise<RedisClient> => {
    const config = new ConfigService();
    const host = config.get<string>('REDIS_SERVER_URL');
    const port = config.get<number>('REDIS_SERVER_PORT');
    const password = config.get<string>('REDIS_SERVER_PASSWORD');
    const twelveHours = 60 * 60 * 12;
    const defaultTTL = +config.get<number>('REDIS_SERVER_TTL') || twelveHours;

    const client = new Redis({
      host,
      port,
      password,
    }) as RedisClient;

    client.setWithTTL = async (
      key: string,
      value: string,
      ttl: number = defaultTTL,
    ) => {
      return client.set(key, value, 'EX', ttl);
    };

    return client;
  },
  provide: REDIS_CLIENT_NAME,
};

import { config } from 'dotenv';
config({
  path: '.env.test',
});

export const configEnvs = {
  dynamodb: {
    region: 'local',
    endpoint: 'http://localhost:8000',
    credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
  },
  redis: {
    store: { create: jest.fn() },
    host: 'localhost',
    port: 6379,
  },
  elastic: { node: 'http:/localhost:9200/' },
};

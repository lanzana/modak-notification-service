import { RedisConfig } from './redis.config';

describe('RedisConfig', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should config object', () => {
    process.env.REDIS_CONNECTION_STRING = 'localhost:6379';

    const redisConfig = new RedisConfig();
    const result = redisConfig.get();
    expect(result).toMatchInlineSnapshot(`
      EventEmitter {
        "_autoPipelines": Map {},
        "_events": {},
        "_eventsCount": 0,
        "_maxListeners": undefined,
        "_runningAutoPipelines": Set {},
        "addedBuiltinSet": Set {},
        "commandQueue": Denque {
          "_capacity": undefined,
          "_capacityMask": 3,
          "_head": 0,
          "_list": [
            ,
            ,
            ,
            ,
          ],
          "_tail": 0,
        },
        "condition": {
          "auth": null,
          "select": 0,
          "subscriber": false,
        },
        "connectionEpoch": 1,
        "connector": StandaloneConnector {
          "connecting": true,
          "disconnectTimeout": 2000,
          "options": {
            "autoPipeliningIgnoredCommands": [],
            "autoResendUnfulfilledCommands": true,
            "autoResubscribe": true,
            "connectTimeout": 10000,
            "connectionName": null,
            "db": 0,
            "disconnectTimeout": 2000,
            "enableAutoPipelining": false,
            "enableOfflineQueue": true,
            "enableReadyCheck": false,
            "enableTLSForSentinelMode": false,
            "failoverDetector": false,
            "family": 4,
            "host": "localhost",
            "keepAlive": 0,
            "keyPrefix": "",
            "lazyConnect": false,
            "maxLoadingRetryTime": 10000,
            "maxRetriesPerRequest": null,
            "name": null,
            "natMap": null,
            "noDelay": true,
            "password": null,
            "port": 6379,
            "readOnly": false,
            "reconnectOnError": null,
            "retryStrategy": [Function],
            "role": "master",
            "sentinelMaxConnections": 10,
            "sentinelReconnectStrategy": [Function],
            "sentinelRetryStrategy": [Function],
            "sentinels": null,
            "stringNumbers": false,
            "updateSentinels": true,
            "username": null,
          },
        },
        "isCluster": false,
        "manuallyClosing": false,
        "offlineQueue": Denque {
          "_capacity": undefined,
          "_capacityMask": 3,
          "_head": 0,
          "_list": [
            ,
            ,
            ,
            ,
          ],
          "_tail": 0,
        },
        "options": {
          "autoPipeliningIgnoredCommands": [],
          "autoResendUnfulfilledCommands": true,
          "autoResubscribe": true,
          "connectTimeout": 10000,
          "connectionName": null,
          "db": 0,
          "disconnectTimeout": 2000,
          "enableAutoPipelining": false,
          "enableOfflineQueue": true,
          "enableReadyCheck": false,
          "enableTLSForSentinelMode": false,
          "failoverDetector": false,
          "family": 4,
          "host": "localhost",
          "keepAlive": 0,
          "keyPrefix": "",
          "lazyConnect": false,
          "maxLoadingRetryTime": 10000,
          "maxRetriesPerRequest": null,
          "name": null,
          "natMap": null,
          "noDelay": true,
          "password": null,
          "port": 6379,
          "readOnly": false,
          "reconnectOnError": null,
          "retryStrategy": [Function],
          "role": "master",
          "sentinelMaxConnections": 10,
          "sentinelReconnectStrategy": [Function],
          "sentinelRetryStrategy": [Function],
          "sentinels": null,
          "stringNumbers": false,
          "updateSentinels": true,
          "username": null,
        },
        "reconnectTimeout": null,
        "retryAttempts": 0,
        "scriptsSet": {},
        "status": "connecting",
        Symbol(shapeMode): false,
        Symbol(kCapture): false,
      }
    `);
  });
});

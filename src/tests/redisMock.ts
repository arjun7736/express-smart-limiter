const store = new Map();

export const mockRedis = {
  incr: jest.fn(async (key) => {
    const value = (store.get(key) || 0) + 1;
    store.set(key, value);
    return value;
  }),
  expire: jest.fn(async () => true),
  ttl: jest.fn(async () => 60),
};

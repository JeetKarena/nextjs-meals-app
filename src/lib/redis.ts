import Redis from "ioredis";

// Validate environment variables
if (!process.env.NEXT_PRIVATE_REDIS_HOST) {
  console.warn("NEXT_PRIVATE_REDIS_HOST not found, Redis will be disabled");
}

let redis: Redis | null = null;

if (process.env.NEXT_PRIVATE_REDIS_HOST && process.env.NEXT_PRIVATE_REDIS_PORT) {
  try {
    redis = new Redis({
      host: process.env.NEXT_PRIVATE_REDIS_HOST.replace(/[;"]/g, ""),
      port: parseInt(process.env.NEXT_PRIVATE_REDIS_PORT, 10),
      username: process.env.NEXT_PRIVATE_REDIS_USERNAME || undefined,
      password: process.env.NEXT_PRIVATE_REDIS_PASSWORD || undefined,
      connectTimeout: 5000,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null, // Don't retry on failure
    });

    redis.on("error", (error) => {
      console.warn("Redis connection error, falling back to no-cache mode:", error.message);
    });

    redis.on("connect", () => {
      console.log("Redis connected successfully");
    });
  } catch (error) {
    console.warn("Failed to initialize Redis:", error);
    redis = null;
  }
}

export default redis;

// Cache helpers with fallback
export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  
  try {
    const cachedData = await redis.get(key);
    if (!cachedData) return null;
    return JSON.parse(cachedData) as T;
  } catch (error) {
    console.warn("Redis cache fetch error:", error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  data: T,
  expireTime = 3600
): Promise<void> {
  if (!redis) return;
  
  try {
    await redis.setex(key, expireTime, JSON.stringify(data));
  } catch (error) {
    console.warn("Redis cache set error:", error);
  }
}

export async function invalidateCache(key: string): Promise<void> {
  if (!redis) return;
  
  try {
    await redis.del(key);
  } catch (error) {
    console.warn("Redis cache invalidation error:", error);
  }
}

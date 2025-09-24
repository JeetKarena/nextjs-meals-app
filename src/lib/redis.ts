import { Redis } from "ioredis";

// Validate environment variables
if (!process.env.NEXT_PRIVATE_REDIS_HOST) {
  throw new Error("NEXT_PRIVATE_REDIS_HOST environment variable is required");
}

if (!process.env.NEXT_PRIVATE_REDIS_PORT) {
  throw new Error("NEXT_PRIVATE_REDIS_PORT environment variable is required");
}

// Fix Redis connection using environment variables
const redis = new Redis({
  host: process.env.NEXT_PRIVATE_REDIS_HOST.replace(/[;"]/g, ""),
  port: parseInt(process.env.NEXT_PRIVATE_REDIS_PORT, 10),
  username: process.env.NEXT_PRIVATE_REDIS_USERNAME || undefined,
  password: process.env.NEXT_PRIVATE_REDIS_PASSWORD || undefined,
  // Performance optimizations
  connectTimeout: 10000,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 100, 3000); // Progressive retry with max 3s delay
  },
  enableOfflineQueue: false, // Don't queue commands when disconnected
});

// Add connection error handling
redis.on("error", (error) => {
  console.error("Redis connection error:", error);
  // Consider implementing a retry mechanism or alerting system here
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

redis.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});

export default redis;

// Cache helpers
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const cachedData = await redis.get(key);
    if (!cachedData) return null;
    try {
      return JSON.parse(cachedData) as T;
    } catch (parseError) {
      console.error("Error parsing cached data:", parseError);
      // Consider invalidating the cache here
      await invalidateCache(key);
      return null;
    }
  } catch (error) {
    console.error("Redis cache fetch error:", error);
    return null;
  }
}

export async function setCache<T>(
  key: string,
  data: T,
  expireTime = 3600
): Promise<void> {
  try {
    await redis.setex(key, expireTime, JSON.stringify(data));
  } catch (error) {
    console.error("Redis cache set error:", error);
    // Consider retrying or alerting here
  }
}

export async function invalidateCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis cache invalidation error:", error);
    // Consider retrying or alerting here
  }
}

// Optional: Function to check cache validity
export async function isCacheValid(
  key: string,
  maxAge = 3600
): Promise<boolean> {
  try {
    const ttl = await redis.ttl(key);
    return ttl > 0 && ttl <= maxAge;
  } catch (error) {
    console.error("Error checking cache validity:", error);
    return false;
  }
}

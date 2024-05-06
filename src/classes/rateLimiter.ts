import { Request } from "express";
import Mutex from "./mutex";

class RateLimiter {
  private static memoryStore: Map<
    string,
    { count: number; lastUpdated: number }
  > = new Map();
  private static mutex: Mutex;

  public static init(): void {
    RateLimiter.memoryStore.clear();
    RateLimiter.mutex = new Mutex();
  }

  // Throttle method to manage request rates
  public static throttle(
    limit: number,
    countPerLimit: number,
    limitByKey: string | ((req: Request) => string)
  ) {
    const key =
      typeof limitByKey === "string" ? limitByKey : limitByKey.toString();
    const currentTime = Date.now();

    // Get or initialize the request count for the key
    const record = RateLimiter.memoryStore.get(key) || {
      count: 0,
      lastUpdated: currentTime,
    };

    // Check if the time window has expired
    if (currentTime - record.lastUpdated > countPerLimit * 1000) {
      record.count = 0;
      record.lastUpdated = currentTime;
    }

    // Check if request count exceeds the limit
    console.log("Request count: ", record.count);
    if (record.count >= limit) {
      return false;
    }

    record.count++;

    RateLimiter.mutex.acquire().then((release) => {
      RateLimiter.memoryStore.set(key, record);
      release();
    });

    return true;
  }
}

export default RateLimiter;

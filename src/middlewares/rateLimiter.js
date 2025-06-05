import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "../config/redis.js";

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rateLimiter",
  points: 30, // Number of requests
  duration: 60, // Per 60 seconds by IP
});

export const rateLimiterMiddleware = (req, res, next) => {
  const clientIp = req.headers["x-forwarded-for"] || req.ip; // Use X-Forwarded-For if available
  console.log(`Rate limiting for IP: ${clientIp}`);

  rateLimiter
    .consume(clientIp)
    .then((rateLimiterRes) => {
      console.log(
        `Remaining points for IP ${clientIp}: ${rateLimiterRes.remainingPoints}`
      );
      next();
    })
    .catch((rateLimiterRes) => {
      console.error(`Too many requests from IP ${clientIp}`);
      console.error(`Rate limiter details:`, rateLimiterRes);
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    });
};

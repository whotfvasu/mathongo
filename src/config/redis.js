import Redis from "ioredis";
const redis = new Redis({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
  username: "default",
  password: process.env.REDIS_PASSWORD, 
});

redis.on("error", (err) => console.error("Redis client error", err));

export default redis;

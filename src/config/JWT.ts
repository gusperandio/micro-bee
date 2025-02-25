import { v4 as uuidv4 } from "uuid";
import { FastifyInstance } from "fastify"; 
import dotenv from "dotenv"; 
export class AuthService {
  constructor(private fastify: FastifyInstance) {}

  generateToken(username: string) {
    const payload = {
      uuid: uuidv4(),
      name: username,
      exp: Math.floor(Date.now() / 1000) + 1000 * 24 * 60 * 60, // 1000 days
    };

    return this.fastify.jwt.sign(payload);
  }
}
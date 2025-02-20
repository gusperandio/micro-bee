import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LogData {
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  timestamp?: Date;
}

export class LogService {
  async createLog(data: LogData) {
    const log = await prisma.log.create({
      data: {
        message: data.message,
        level: data.level,
        timestamp: data.timestamp || new Date(),
      },
    });
    return log;
  }
}
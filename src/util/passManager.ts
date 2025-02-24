const bcrypt = require("bcrypt");

class PassManager {
  private static instance: PassManager;
  saltRounds: number;

  private constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  public static getInstance(saltRounds: number = 10): PassManager {
    if (!PassManager.instance) {
      PassManager.instance = new PassManager(saltRounds);
    }
    return PassManager.instance;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public async checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default PassManager;

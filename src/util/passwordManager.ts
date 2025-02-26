const bcrypt = require("bcrypt");

class PasswordManager {
  private static instance: PasswordManager;
  saltRounds: number;

  private constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  public static getInstance(saltRounds: number = 10): PasswordManager {
    if (!PasswordManager.instance) {
      PasswordManager.instance = new PasswordManager(saltRounds);
    }
    return PasswordManager.instance;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public async checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default PasswordManager;

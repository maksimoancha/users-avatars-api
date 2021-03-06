import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT') || 8080;
  }
}

// notice required env variables
const configService = new ConfigService(process.env).ensureValues(['PORT']);

export { configService };

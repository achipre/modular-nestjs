import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASK') private tasks: any[],
    // private config: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiK = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hello World! APIKEY ${apiK} y base de datos ${name} ingresa a /api`;
  }
}

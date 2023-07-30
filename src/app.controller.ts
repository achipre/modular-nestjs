import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/firstslash')
  firstslash(): string {
    return 'llevo slash(/) al principio';
  }
  @Get('lastslash/')
  lastslash() {
    return 'llevo slash(/) al final';
  }
  @Get('/bothslash/')
  bothslash() {
    return 'llevo slash(/) al principio y al final';
  }
}

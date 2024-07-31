import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
@UseGuards(ThrottlerGuard)
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}
  // @Throttle({ default: { limit: 3, ttl: 6 } })
  // @Throttle(2,10)
  // @UseGuards(ThrottlerGuard)
  @Get()
  getHello(@Req() request: any): string {
    this.logger.log(`Handling GET request for / from IP: ${request.ip}`);
    return this.appService.getHello();
  }

  @Get('userrrrr')
  getUser() {
    return [];
  }
}

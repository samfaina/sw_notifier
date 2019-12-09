import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PushService } from './push.service';

@Controller()
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @MessagePattern('push')
  async pushUpdate(name: string) {
    return this.pushService.notifyUpdate(name);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import * as PushBullet from 'pushbullet';

@Injectable()
export class PushService {
  private pusher: PushBullet;
  private logger = new Logger('PushService');

  constructor() {
    this.pusher = new PushBullet(process.env.SW_PUSH_API_KEY);
  }

  notifyUpdate(siteName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.pusher.note(
        process.env.SW_PUSH_DEVICE_ID,
        'Yuju!',
        'There are some updates!',
        (error, response) => {
          if (error) {
            this.logger.error('PUSH ERROR', error);
            reject(error);
          } else {
            this.logger.log(`NEW PUSH: ${siteName}`);
            resolve(Object.assign(response, { siteName: siteName }));
          }
        },
      );
    });
  }
}

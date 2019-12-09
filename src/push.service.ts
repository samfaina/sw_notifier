import { Injectable, Logger } from '@nestjs/common';
import * as PushBullet from 'pushbullet';

const DEVICE_ID = 'ujwH6rFcu5IsjCkNuiwQMu';
const PUSH_BULLET_API_KEY = 'o.DbVxzC8KiqE47oRZwSaWq67PC0P2wKhg';

@Injectable()
export class PushService {
  private pusher: PushBullet;
  private logger = new Logger('PushService');

  constructor() {
    this.pusher = new PushBullet(PUSH_BULLET_API_KEY);
  }

  notifyUpdate(siteName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.pusher.note(
        DEVICE_ID,
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

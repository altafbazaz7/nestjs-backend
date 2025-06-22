// src/mongoose-event.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongooseEventService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.once('open', () => {
      console.log('✅ Connected to MongoDB');
    });

    this.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
  }
}

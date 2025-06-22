// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('URI'),
      }),
      inject: [ConfigService],
    }),
    PropertyModule,
  ],
})
export class AppModule {}

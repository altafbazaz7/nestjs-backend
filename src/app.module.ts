import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://altafbazaz7:Reactjs123@cluster0.h5qdtmi.mongodb.net/memang?retryWrites=true&w=majority'),
    PropertyModule,
  ],
})
export class AppModule {}

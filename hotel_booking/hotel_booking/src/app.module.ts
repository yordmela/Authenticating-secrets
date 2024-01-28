/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HotelRoomModule } from './hotel-room/hotel-room.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
//import { CustomerRequestModule } from './customer-request/customer-request.module';
 
@Module({
  imports:[
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './', 'hotel_booking'),
    }),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule, 
    PrismaModule, 
    HotelRoomModule,
    //CustomerRequestModule
 
  ],
})
export class AppModule {}
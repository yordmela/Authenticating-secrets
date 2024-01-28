/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import {HotelRoomService} from './hotel-room.servce'
import { HotelRoomController } from './hotel-room.controller';
 
@Module({
    controllers:[HotelRoomController],
    providers:[HotelRoomService]
})
export class HotelRoomModule {}

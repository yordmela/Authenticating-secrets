/* eslint-disable prettier/prettier */
import { Controller, Post, Put, Get, Param, Body, Delete, UseGuards, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { HotelRoomService } from "./hotel-room.servce";
import { RoomDto, RoomRequestDto } from "./dto";
import { JwtGuard } from "src/auth/guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Express } from 'express';
import { join } from 'path';
import { of } from 'rxjs';

export const storage = {
    storage: diskStorage({
        destination: './rooms/Image',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('hotelroom')
export class HotelRoomController {
    constructor(private service: HotelRoomService) {}
    @Get('economic')
    economicroom () {
        return this.service.economicroom()
    }

    @Get('vip')
    viproom () {
        return this.service.viproom()
    }

    @Get('middle')
    middleroom () {
        return this.service.middleroom()
    }

    @Get(':id')
    findByid (@Param('id') id: number) {
        return this.service.findById(id)
    }

    @UseGuards(JwtGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('Image', storage))
    async createRoom(
        @Body() roomObj: RoomDto,
        @UploadedFile() Image: Express.Multer.File,
        ) {
        return await this.service.create(roomObj, Image.filename);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('Image', storage))
    async updateRoom(
        @Param('id') id: number,
        @Body() roomData: RoomDto,
        @UploadedFile() Image: Express.Multer.File
    ){
        return await this.service.update(id, roomData, Image.filename);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteRoom(@Param('id') id: number) {
        return await this.service.delete(id);
    }


    @Post('room-request')
    async userRequestCreate(@Body() roomrequestDto: RoomRequestDto) {
        return await this.service.createRequest(roomrequestDto)

    }

    @Delete('room-delete/:id')
    async userrequestDelete(
        @Param('id') id: number,
        ) {
        return await this.service.cancelRequest(id)
    }

    @Put('room-update/:id')
    async userRequestUpdate(
        @Param('id') id: number,
        @Body() roomRequestDto: RoomRequestDto,
    ) {
        return await this.service.updateRequest(Number(id), roomRequestDto)
    }

    @Get('room-requests')
    async getAllRequest () {
        return await this.service.getAllRequest()
    }


    @Get('image/:imagename')
    findImage(
        @Param('imagename') imagename: string, 
        @Res() res: any
        ) {
        return of(res.sendFile(join(process.cwd(), 'rooms/Image/' + imagename)));
    }
}
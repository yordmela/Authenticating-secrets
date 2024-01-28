/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';

import { RoomDto } from './roomRequestDto';
import { CustomRequestServiceHandeler } from './customer-request.service';

@Controller('user-request')
export class CustomerRequestController {
    constructor(private service: CustomRequestServiceHandeler) {}

    // @Get('all')
    // getAllRequest () {
    //     return this.service.getAllRequest()
    // }


    // @Post('book')
    // bookroom (@Body() requestDto: RoomDto) {
    //     return this.service.roomRequest(requestDto)
    // }

    // @Delete(':id')
    // deleteRequest (@Param('id') id: number) {
    //     return this.service.roomRequestDelete(id);
    // }


}

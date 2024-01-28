/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty, IsNumber} from "class-validator";

export class RoomDto {

    @IsNotEmpty()
    @IsString()
    roomId: number;

    @IsNotEmpty()
    @IsString()
    from: Date;

    @IsNotEmpty()
    @IsNumber()
    to: Date;
}
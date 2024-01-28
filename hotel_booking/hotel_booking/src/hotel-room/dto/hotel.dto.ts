/* eslint-disable prettier/prettier */

import { IsString, IsNotEmpty } from "class-validator";

export class RoomDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    classId: string;


    @IsString()
    avaliable: string;
}

export class RoomRequestDto {

    @IsNotEmpty()
    roomId: string;

    @IsNotEmpty()
    @IsString()
    from: Date;

    @IsNotEmpty()
    @IsString()
    to: Date;
}
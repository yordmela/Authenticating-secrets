/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class AuthDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    is_admin: string;
}
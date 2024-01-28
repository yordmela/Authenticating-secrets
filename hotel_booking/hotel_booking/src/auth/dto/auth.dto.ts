/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class AuthDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
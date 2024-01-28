/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable({})
export class CustomRequestServiceHandeler {
    constructor(private prisma: PrismaClient) {}
}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerRequestController } from './customer-request.controller';
import { CustomRequestServiceHandeler } from './customer-request.service';


@Module({
  controllers:[CustomerRequestController],
  providers:[CustomRequestServiceHandeler]
})
export class CustomerRequestModule {}
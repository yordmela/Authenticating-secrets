/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomDto, RoomRequestDto } from './dto';


@Injectable()
export class HotelRoomService {
  constructor(private prisma: PrismaService) {}

  async economicroom() {
    const allRoom = await this.prisma.room.findMany({
      where:{
        classId:3
      }
    });
    return allRoom
  }

  async viproom() {
    const allRoom = await this.prisma.room.findMany({
      where:{
        classId:1
      }
    });
    return allRoom
  }
  async middleroom() {
    const allRoom = await this.prisma.room.findMany({
      where:{
        classId:2
      }
    });
    return allRoom
  }

  async findById(id: number) {
    const room = await this.prisma.room.findUnique({
      where:{
        id:Number(id),
      }
    })
    return room
  }

  async create(roomObj: RoomDto, Image: string) {
    const newHotelRoom = await this.prisma.room.create({
      data: {
        description: roomObj.description,
        title: roomObj.title,
        image: 'http://localhost:9100/hotelroom/image/'+Image,
        classId: Number(roomObj.classId),
        price: Number(roomObj.price),
      }
    })
    return newHotelRoom
  }

  async update(id: number, roomObj: RoomDto, Image: string) {
    if(Image){
      const updated = await this.prisma.room.update({
        where: {
          id:Number(id),
        },
        data:{
          description: roomObj.description,
          title: roomObj.title,
          image: 'http://localhost:9100/hotelroom/image/'+Image,
          classId: Number(roomObj.classId),
          price: Number(roomObj.price), 
          avaliable: Boolean(roomObj.avaliable)
        }
      })
      return updated
    }
    const updated = await this.prisma.room.update({
      where: {
        id:Number(id),
      },
      data:{
        description: roomObj.description,
        title: roomObj.title,
        classId: Number(roomObj.classId),
        price: Number(roomObj.price), 
        avaliable: Boolean(roomObj.avaliable)
      }
    })
    return updated
  }

  async delete(id: number){
    const deletedRoom = await this.prisma.room.delete({
      where:{
        id:Number(id),
      }
    })

    return deletedRoom
  }

  async createRequest (roomrequestDto: RoomRequestDto) {
    const createrequest = await this.prisma.customerRequest.create({
      data:{
        roomid: Number(roomrequestDto.roomId),
        to: new Date(roomrequestDto.to),
        approval: false,
        form: new Date(roomrequestDto.from),
      }
    })
    return createrequest;
  }

  async cancelRequest (id: number){
    const deletedrequest = await this.prisma.customerRequest.delete({
      where:{
        id:Number(id)
      }
    })
    return deletedrequest
  }

  async updateRequest(id: number, roomrequestDto: RoomRequestDto){
    const updatedRequet = await this.prisma.customerRequest.update({
      where:{
        id:Number(id)
      },
      data:{
        roomid:Number(roomrequestDto.roomId),
        to: new Date(roomrequestDto.to),
        form: new Date(roomrequestDto.from),
        approval:false,
      }
    })
    return updatedRequet
  }

  async getAllRequest() {
    return await this.prisma.customerRequest.findMany()
  }

}

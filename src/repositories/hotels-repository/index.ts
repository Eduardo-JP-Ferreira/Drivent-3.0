import { Hotel, Room, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';


async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelById(userId: number) : Promise<Hotel>{
  return prisma.hotel.findFirst({
    where:{
      id: userId,
    }
  });
}

async function findHotelRooms(hotelId: number) {
  return prisma.hotel.findMany({
    where:{
      id: hotelId,
    },
    include: {
      Rooms: true
    }
  });
}

export default {
  findHotels,
  findHotelById,
  findHotelRooms,
};

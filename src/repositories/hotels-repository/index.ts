import { Hotel, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicketParams } from '@/protocols';

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

export default {
  findHotels,
};

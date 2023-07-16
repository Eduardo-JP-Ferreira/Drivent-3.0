import { Hotel, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Response } from 'express';
import httpStatus from 'http-status';



async function getHotels(userId: number, res: Response): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if(
    ticket.status === 'RESERVED' ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false
  ) throw res.sendStatus(httpStatus.PAYMENT_REQUIRED);

  const hotels: Hotel[] = await hotelsRepository.findHotels();
  if (!hotels) throw notFoundError();
  if(hotels.length === 0) throw notFoundError();
  return hotels;
}

const hotelsService = { getHotels };

export default hotelsService;

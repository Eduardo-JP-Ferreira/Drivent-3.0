import { Hotel, Room, Ticket, TicketStatus, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Response } from 'express';
import httpStatus from 'http-status';
import { HotelRoom, Rooms } from '@/protocols';



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

async function getHotelRooms(userId: number, hotelId: number, res: Response) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if(
    ticket.status === 'RESERVED' ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false
  ) throw res.sendStatus(httpStatus.PAYMENT_REQUIRED);

  const hotel= await hotelsRepository.findHotelById(hotelId);
  if (!hotel) throw notFoundError();

  // const rooms: Rooms = await hotelsRepository.findHotelRooms(hotelId);
  // if (!rooms || rooms.length === 0) throw notFoundError();
    
  // const result = {
  //   id: hotel.id,
  //   name: hotel.name,
  //   image: hotel.image,
  //   createdAt: hotel.createdAt,
  //   updatedAt: hotel.updatedAt,
  //   Rooms: rooms,
  // }

  return hotel;
}

const hotelsService = { getHotels, getHotelRooms };

export default hotelsService;

import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { InputHotelParams } from '@/protocols';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await hotelsService.getHotels(userId, res);
    return res.status(httpStatus.OK).send(ticket);
  } catch (e) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = Number(req.params.hotelId)
  try {
    const ticket = await hotelsService.getHotelRooms(userId, hotelId, res);
    return res.status(httpStatus.OK).send(ticket);
  } catch (e) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
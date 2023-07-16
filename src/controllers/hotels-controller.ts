import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(ticket);
  } catch (e) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

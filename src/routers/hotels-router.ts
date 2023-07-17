import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotelRoom, getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/health', (_req, res) => res.send('OK!'))
  .get('/', getHotels)
  .get('/:hotelId', getHotelRoom) 

export { hotelsRouter };

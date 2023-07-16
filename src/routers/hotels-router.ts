import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/health', (_req, res) => res.send('OK!'))
  .get('/', getHotels)
  .get('/:hotelId') 


export { hotelsRouter };

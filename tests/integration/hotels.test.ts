import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createPayment,
  generateCreditCardData,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels/health', () => {
  it('should respond with status 200 with message "OK!" ', async () => {
    const token = await generateValidToken();

    const response = await server.get('/hotels/health').set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe('OK!');
  });

  it('should respond with status 401 if no token is given', async () => {
    const token = faker.lorem.word();
    const response = await server.get('/hotels/health').set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

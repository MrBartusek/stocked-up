import { Request } from 'express';
import { Types } from 'mongoose';

const mockUserRequest = { user: { id: new Types.ObjectId() } } as any as Request;

export { mockUserRequest };

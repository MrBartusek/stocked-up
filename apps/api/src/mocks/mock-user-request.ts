import { Request } from 'express';
import { Types } from 'mongoose';

const mockUserRequest = {
	user: {
		id: new Types.ObjectId(),
	},
	logout: (callback: (error: any) => void) => callback(null),
} as any as Request;

export { mockUserRequest };

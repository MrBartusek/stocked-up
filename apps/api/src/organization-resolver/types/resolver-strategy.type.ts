import { Types } from 'mongoose';

export interface ResolverStrategy {
	resolve(id: Types.ObjectId): Promise<Types.ObjectId | null>;
}

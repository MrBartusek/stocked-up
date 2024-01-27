import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ResolverStrategy } from '../types/resolver-strategy.type';

@Injectable()
export class OrganizationStrategy implements ResolverStrategy {
	async resolve(id: Types.ObjectId): Promise<Types.ObjectId> {
		return id;
	}
}

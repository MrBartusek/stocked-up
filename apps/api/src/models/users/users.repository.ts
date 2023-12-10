import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
	/* istanbul ignore next */
	constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
		super(userModel);
	}
}

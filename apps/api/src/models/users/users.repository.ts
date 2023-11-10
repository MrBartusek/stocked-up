import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
	constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
		super(userModel);
	}
}

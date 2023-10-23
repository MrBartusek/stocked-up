import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entity.repository';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
	constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
		super(userModel);
	}
}
